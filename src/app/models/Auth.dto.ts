import {BaseDTO} from "./Base.dto";

export class AuthDTO extends BaseDTO {
    id: number = 0;
    name: string = '';
    username: string = '';
    email: string = '';
    password: string = '';
    password_confirmation: string = '';

    convertToDTO(data: any) {
        this.id = data.id;
        this.name = data.name;
        this.username = data.username;
        this.email = data.email;
        this.password = data.password;
        this.password_confirmation = data.password_confirmation;
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;
    }

    convertToNewDTO(data: any): AuthDTO {
      let authDTO: AuthDTO = new AuthDTO();
      data.id = null;
      authDTO.convertToDTO(data);

      return authDTO;
    }
}