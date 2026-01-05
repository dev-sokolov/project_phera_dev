export const checkBlur = (canvas) => {
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    // Конвертируем в grayscale
    const gray = new Uint8Array(canvas.width * canvas.height);
    for (let i = 0; i < data.length; i += 4) {
        gray[i / 4] = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
    }
    
    // Laplacian operator
    let laplacianSum = 0;
    const width = canvas.width;
    const height = canvas.height;
    
    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
            const idx = y * width + x;
            const laplacian = Math.abs(
                4 * gray[idx] -
                gray[idx - 1] - gray[idx + 1] -
                gray[idx - width] - gray[idx + width]
            );
            laplacianSum += laplacian * laplacian;
        }
    }
    
    const variance = laplacianSum / ((width - 2) * (height - 2));
    
    // Порог: variance < 100 = размыто
    return {
        variance,
        isBlurry: variance < 100,
        quality: variance > 200 ? 'excellent' : variance > 100 ? 'good' : 'poor'
    };
};

// Проверка пересветов (Exposure/Glare)
export const checkExposure = (canvas) => {
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    let overexposedPixels = 0;
    let underexposedPixels = 0;
    const totalPixels = canvas.width * canvas.height;
    
    for (let i = 0; i < data.length; i += 4) {
        const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
        
        if (brightness > 240) overexposedPixels++;
        if (brightness < 20) underexposedPixels++;
    }
    
    const overexposedPercent = (overexposedPixels / totalPixels) * 100;
    const underexposedPercent = (underexposedPixels / totalPixels) * 100;
    
    return {
        overexposedPercent,
        underexposedPercent,
        hasGlare: overexposedPercent > 10, // > 10% пересвечено
        tooDark: underexposedPercent > 30, // > 30% слишком темно
        quality: overexposedPercent < 5 && underexposedPercent < 20 ? 'good' : 'poor'
    };
};

// Комплексная проверка качества
export const checkImageQuality = (canvas) => {
    const blurCheck = checkBlur(canvas);
    const exposureCheck = checkExposure(canvas);
    
    const isGoodQuality = 
        !blurCheck.isBlurry && 
        !exposureCheck.hasGlare && 
        !exposureCheck.tooDark;
    
    return {
        isGoodQuality,
        blur: blurCheck,
        exposure: exposureCheck,
        overallQuality: isGoodQuality ? 'excellent' : 'poor',
        issues: [
            blurCheck.isBlurry && 'Image is blurry',
            exposureCheck.hasGlare && 'Too much glare detected',
            exposureCheck.tooDark && 'Image is too dark'
        ].filter(Boolean)
    };
};