import User from "./user.model";

export default interface Answer {
    answer: string;
    user?: User;
}