export interface IFormControl {
  label: string;
  name: "name" | "password" | "email" | "confirmPassword";
  placeholder: string;
  type?: string;
}
