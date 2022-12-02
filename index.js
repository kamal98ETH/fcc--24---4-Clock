class Clock extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            break: 300000,
            session: 1500000,
            time_left: 1500000,
            countdown: false,
            period: "Session"
        };
        this.reset = this.reset.bind(this);
        this.timer = this.timer.bind(this);
        this.break_decrement = this.break_decrement.bind(this);
        this.break_increment = this.break_increment.bind(this);
        this.session_decrement = this.session_decrement.bind(this);
        this.session_increment = this.session_increment.bind(this);
    }

    converter(millisecs) {
        if (millisecs == 3600000) {
            return "60:00"
        }
        let date = new Date(millisecs).toString();
        return date.split(" ")[4].substring(3)
    }

    getMinutes(millisecs) {
        if (millisecs == 3600000) {
            return "60"
        }
        let date = new Date(millisecs);
        return date.getMinutes().toString();
    }

    reset() {
        this.pause();
        document.getElementById('beep').pause();
        document.getElementById('beep').currentTime = 0;
        this.setState({
            break: 300000,
            session: 1500000,
            time_left: 1500000,
            countdown: false,
            period: "Session"
        })
    }

    break_decrement() {
        if (this.state.countdown) {
            return;
        };
        if (this.state.break <= 60000) {
            this.setState({
                break: 60000
            });
            return;
        };
        if (this.state.period == "Break") {
            this.setState({
                time_left: this.state.break - 60000
            });
        };
        this.setState({
            break: this.state.break - 60000
        });
    };

    break_increment() {
        if (this.state.countdown) {
            return;
        };
        if (this.state.break >= 3600000) {
            this.setState({
                break: 3600000
            });
            return;
        };
        this.setState({
            break: this.state.break + 60000
        });
        if (this.state.period == "Break") {
            this.setState({
                time_left: this.state.break + 60000
            });
        };
    }

    session_decrement() {
        if (this.state.countdown) {
            return;
        };
        if (this.state.session <= 60000) {
            this.setState({
                session: 60000
            });
            return;
        };
        if (this.state.period == "Session") {
            this.setState({
                time_left: this.state.session - 60000
            });
        };
        this.setState({
            session: this.state.session - 60000
        });
    }

    session_increment() {
        if (this.state.countdown) {
            return;
        };
        if (this.state.session >= 3600000) {
            this.setState({
                session: 3600000
            });
            return;
        };
        if (this.state.period == "Session") {
            this.setState({
                time_left: this.state.session + 60000
            });
        };
        this.setState({
            session: this.state.session + 60000
        });
    }

    timer() {
        if (this.state.countdown) {
            this.pause()
        } else {
            this.tick()
        }
        this.setState({
            countdown: !this.state.countdown
        })
    }

    tick = () => {
        this.countdown = setInterval(this.newTime, 1000)

    }

    pause = () => {
        clearInterval(this.countdown)
    }

    newTime = () => {
        if (this.state.time_left <= 0) {
            document.getElementById('beep').play();
            if (this.state.period == "Session") {
                this.setState({
                    time_left: this.state.break,
                    period: "Break"
                });
                return;
            } else {
                this.setState({
                    time_left: this.state.session,
                    period: "Session"
                });
                return;
            }
        }
        this.setState({
            time_left: this.state.time_left - 1000
        })
    }

    componentDidUpdate() {
        if (this.state.time_left < 60000) {
            document.getElementsByClassName("timer")[0].style.color = "red"
        } else {
            document.getElementsByClassName("timer")[0].style.color = "white"
        }
    }

    render() {
        return (
            <div id="clock">
                <h1 id="titel">
                    25 + 5 clock
                </h1>
                <div className="break-session">
                    <div className="controller">
                        <h2 id="break-label">Break Length</h2>
                        <div className="increment-decrement">
                            <button id="break-decrement" onClick={this.break_decrement}><i className="fa-solid fa-arrow-down"></i></button>
                            <p id="break-length">{this.getMinutes(this.state.break)}</p>
                            <button id="break-increment" onClick={this.break_increment}><i className="fa-solid fa-arrow-up"></i></button>
                        </div>
                    </div>
                    <div className="controller">
                        <h2 id="session-label">Session Length</h2>
                        <div className="increment-decrement">
                            <button id="session-decrement" onClick={this.session_decrement}><i className="fa-solid fa-arrow-down"></i></button>
                            <p id="session-length">{this.getMinutes(this.state.session)}</p>
                            <button id="session-increment" onClick={this.session_increment}><i className="fa-solid fa-arrow-up"></i></button>
                        </div>
                    </div>
                </div>
                <div className="timer">
                    <h3 id="timer-label">
                        {this.state.period}
                    </h3>
                    <p id="time-left">{this.converter(this.state.time_left)}</p>
                </div>
                <div className="start_stop-reset">
                    <button id="start_stop" onClick={this.timer}>
                        <i className="fa-solid fa-play"></i>
                        <i className="fa-solid fa-pause"></i>
                    </button>
                    <button id="reset" onClick={this.reset}><i className="fa-solid fa-rotate"></i></button>
                </div>
                <audio id="beep" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>
            </div>
        )
    }
}

class App extends React.Component {
    render() {
        return (
            <div id="container">
                <Clock />
            </div>
        )
    }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
