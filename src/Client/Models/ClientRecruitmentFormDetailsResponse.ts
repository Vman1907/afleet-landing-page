import ClientRecruitmentFormDetails from "./ClientRecruitmentFormDetails";

export default class ClientRecruitmentFormDetailsResponse {
  id: number = -1
  program_id: number = -1
  form_id: number = -1
  status: number = -1
  form_string: string = ""
  createdAt: string = ""
  formData: ClientRecruitmentFormDetails[] = [];
}