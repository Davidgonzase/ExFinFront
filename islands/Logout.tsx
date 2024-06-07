import { FunctionComponent } from "preact";

export const Logout: FunctionComponent = () => {
    function out() {
        document.cookie = "auth" + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.href = "/login";
    }
    return (
        <a class="logout-button" onClick={()=>{out()}}>Logout</a>
    );
};