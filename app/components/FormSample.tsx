import { useForm } from 'react-hook-form';



export default function App() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  console.log(errors);
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="email" placeholder="Email" {...register("Email", {required: true})} />
      <input type="text" placeholder="User Name" {...register("User Name", {, min: 3, maxLength: 15, pattern: //^[a-zA-Z0-9_-]+$//i})} />
      <input type="password" placeholder="Password" {...register("Password", {required: true, min: 3, maxLength: 80, pattern: //^[A-Za-z\d@$!%*?&#]+$//i})} />
      <input type="password" placeholder="Password Confirm" {...register("Password Confirm", {required: true, min: 3, maxLength: 80, pattern: //^[A-Za-z\d@$!%*?&#]+$//i})} />

      <input type="submit" />
    </form>
  );
}