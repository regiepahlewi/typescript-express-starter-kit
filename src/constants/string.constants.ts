export class StringConstants {

    //REGEX
    static REGEX_PHONE_NUMBER_INA = '^[+]*[(]{0,1}[6]{0,2}[2]{0,3}[8]{1,4}[)]{0,1}[0-9]*$';
    static REGEX_EMAIL = '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$';

    //MESSAGE
    static MSG_SUCCESS_INSERT = 'Data has been added successfully';
    static MSG_EMAIL_ALREADY_TAKEN = 'Email has already taken';
    static MSG_MOBILE_NUMBER_ALREADY_TAKEN = 'Mobile number has already taken';
    static MSG_ERROR_500 = 'Internal Server Error, Please contact your administrator.';
}