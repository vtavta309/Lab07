import { object, string } from "yup";

export const validationSchema = object({
  userName: string().required("Please enter name").min(2, "Name too short"),
  password: string()
    .required("Please enter password")
    .min(7, "Password should be minimum 7 characters long"),
});
export const validationAddFilm = object({
  title: string().required("Please enter title").min(2, "title too short"),
  year: string().required("Please enter year").min(2, "title too year"),
  nation: string().required("Please enter nation").min(2, "nation too short"),
  des: string().required("Please enter des").min(2, "des too short"),
  clip: string().required("Please enter clip").min(2, "clip too short"),
});

export const courseCategory = [
  {
    value: "webDevelopment",
    label: "Web Development",
  },
  {
    value: "networking",
    label: "Networking",
  },
  {
    value: "computerScience",
    label: "Computer Science",
  },
];
