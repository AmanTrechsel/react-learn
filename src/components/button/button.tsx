import "./button.css";

export default function Button({title, onClick=() => {}, inverted = false, img = ""}: {title: string, onClick?: () => void, inverted?: boolean, img?: string}) {
    function getContent() {
        if (img.length > 0) {
            return (
                <button className={inverted ? "inverted" : "button"} onClick={onClick}>
                    <img src={img} alt="Back button" />
                    {title}
                    <div></div>
                </button>
            );
        }
        else {
            return (
                <button className={inverted ? "inverted" : "button"} onClick={onClick}>
                    {title}
                </button>
            )
        }
    }
    
    return (
        <div className="buttonWrapper">
            {getContent()}
        </div>
    );
}