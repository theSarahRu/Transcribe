interface IState {
    users: {
        users: IUser[];
        selectedUser: string;
    };
    tasks: {
        loaded: boolean;
        pending: boolean;
        projects: IProject[];
        selectedProject: string;
        selectedTask: string;
    }
    audio: {
        jump: number;
        playSpeedRate: number;
        playing: boolean;
    }
}