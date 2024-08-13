import "./button.css";

export default function Button({title, onclick=()=>{}, inverted = false, img = ""}: {title: string, onclick?: VoidFunction, inverted?: boolean, img?: string}) {
    function getContent() {
        if (img.length > 0) {
            return (
                <button className={inverted ? "inverted" : "button"} onClick={onclick}>
                    <img src={img} alt="Back button" />
                    {title}
                    <div></div>
                </button>
            );
        }
        else {
            return (
                <button className={inverted ? "inverted" : "button"} onClick={onclick}>
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