import "./button.css";

export default function Button({title, onClick = () => {}, inverted = false, submit = false, img = ""}: {title: string, onClick?: (event: any) => void, inverted?: boolean, submit?: boolean, img?: string}) {
    function submitContent(event: any) {
        if (submit) {
            onClick(event);
        }
    }
    
    function getContent() {
        if (img.length > 0) {
            return (
                <button className={inverted ? "inverted" : "button"} onClick={onClick} onSubmit={submitContent}>
                    <img src={img} alt="Back button" />
                    {title}
                    <div></div>
                </button>
            );
        }
        else {
            return (
                <button className={inverted ? "inverted" : "button"} onClick={onClick} onSubmit={submitContent}>
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