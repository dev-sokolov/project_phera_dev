// import { useForm } from "react-hook-form";

// const RegistrationStepName = ({ defaultValue, updateData, back, finish }) => {
//     const { register, handleSubmit } = useForm({
//         defaultValues: { name: defaultValue }
//     });

//     const onSubmit = (values) => {
//         updateData(values);
//         finish();
//     };

//     return (
//         <form onSubmit={handleSubmit(onSubmit)}>
//             <h1>Your name (optional)</h1>

//             <input
//                 {...register("name")}
//                 placeholder="Enter your name (optional)"
//                 type="text"
//             />

//             <button type="button" onClick={back}>Back</button>
//             <button type="submit">Finish</button>
//         </form>
//     );
// };

// export default RegistrationStepName;


import { useForm } from "react-hook-form";
import Button from "../../../components/Button/Button";
import ButtonReverse from "../../../components/ButtonReverse/ButtonReverse";

const RegistrationStepName = ({ defaultValue, updateData, back, finish }) => {
    const { register, handleSubmit } = useForm({
        defaultValues: { name: defaultValue }
    });

    const onSubmit = (values) => {
        updateData(values);
        finish();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Your name</h1>

            <input
                {...register("name", { required: true })}
                placeholder="Enter your name"
            />

            <Button type="submit">Finish</Button>
            <ButtonReverse type="button" onClick={back}>
                Go back
            </ButtonReverse>
        </form>
    );
};

export default RegistrationStepName;