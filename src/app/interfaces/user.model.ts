export default interface User {
    id: number;
    name: string;
    roomCode: string;
    isHost: boolean;
    currentAnswer: string;
    score: number;
}