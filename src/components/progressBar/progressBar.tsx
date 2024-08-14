import "./progressBar.css";

export default function ProgressBar({ progress }: { progress: number }) {
    return (
    <div className="progressBar">
        <div className="progressBarBackground">
            <div style={{width: progress + "%"}} className="progressBarFill"></div>
        </div>
        <p className="progressBarPercentage">{progress}%</p>
    </div>
    );
}
