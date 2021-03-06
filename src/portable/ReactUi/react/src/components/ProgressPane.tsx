import * as React from 'react';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import * as actions from '../actions/audioActions';
import { IState } from '../model/state';
import TimeMarker from './controls/TimeMarker';
import './ProgressPane.css';

interface IProps extends IStateProps, IDispatchProps {
};

const initialState = {
    audioPlayedSeconds: 0,
    seeking: false,
    totalSeconds: 0,
}

class ProgressPane extends React.Component<IProps, typeof initialState> {
    public readonly state = initialState;
    public player: any;

    public onProgress = (ctrl: any) => {
        if (!this.state.seeking){
            this.setState({
                audioPlayedSeconds: ctrl.playedSeconds,
                seeking: false,
                totalSeconds: ctrl.loadedSeconds,
            })
        }
    }

    public onPause = () => {
       // tslint:disable-next-line:no-console
       console.log("e.target.value");
    }

    public onSeekMouseDown = () => {
        this.setState({ ...this.state, seeking: true })
    }

    public onSeekMouseUp = (e:React.MouseEvent) => {
        this.setState({ ...this.state, seeking:false })
        this.player.seekTo((e.clientX - 493) / e.currentTarget.clientWidth)
    }

    public ref = (player: any) => {
        this.player = player
    }

    public render() {
        const { jump, selectedTask, selectedUser, users } = this.props;
        const { audioPlayedSeconds, totalSeconds } = this.state;
        const audioFile = '/api/audio/' + selectedTask + '.mp3'
        const user = users.filter(u => u.username.id === selectedUser)[0];
        let position = audioPlayedSeconds;
        if (jump !== 0){
            position += jump;
            this.player.seekTo(position);
            this.props.jumpChange(0);
        }
        return (
            <div className="ProgressPane">
                <div className="progress">
                    <progress
                        className="progressBar"
                        max={totalSeconds}
                        onMouseDown={this.onSeekMouseDown}
                        onMouseUp={this.onSeekMouseUp}
                        value={position} />
                </div>
                <div className="timeMarker">
                    <TimeMarker
                        playedSeconds={audioPlayedSeconds}
                        totalSeconds={totalSeconds}
                        timer={user !== undefined? user.timer: "countup"} />
                </div>
                <div className="RealPlayer">
                    <ReactPlayer
                        ref={this.ref}
                        url={audioFile}
                        controls={true}
                        onPause={this.onPause}
                        onEnded={this.props.playStatus.bind(this, false)}
                        playbackRate={this.props.playSpeedRate}
                        playing={this.props.playing}
                        onProgress={this.onProgress} />
                </div>
            </div>
        )
    }
};

interface IStateProps {
    playing: boolean;
    playSpeedRate: number;
    selectedTask: string;
    selectedUser: string;
    jump: number;
    users: IUser[];
};

interface IDispatchProps {
    jumpChange: typeof actions.jumpChange,
    playStatus: typeof actions.playStatus,
    playSpeedRateChange: typeof actions.playSpeedRateChange;
};

const mapStateToProps = (state: IState): IStateProps => ({
    jump:  state.audio.jump,
    playSpeedRate:  state.audio.playSpeedRate,
    playing: state.audio.playing,
    selectedTask:  state.tasks.selectedTask,
    selectedUser: state.users.selectedUser,
    users: state.users.users
});

export default connect(mapStateToProps)(ProgressPane);
