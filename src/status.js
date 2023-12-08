// An execution status message.
import { sanitize } from "./text.js";

const messages = {
    running: "Running...",
    failed: "✘ Failed",
    done: "✓ Done",
};

// CodapiStatus shows the execution status.
class CodapiStatus extends HTMLElement {
    // showRunning shows running status.
    showRunning() {
        const message = this.getAttribute("running") || messages.running;
        this.innerHTML = `
            <svg width="1em" height="1em" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"><animateTransform attributeName="transform" type="rotate" dur="0.75s" values="0 12 12;360 12 12" repeatCount="indefinite"/></path></svg>
            ${message}
        `;
    }

    // showFinished shows succeeded/failed status.
    showFinished(result) {
        if (!result.ok) {
            this.innerHTML =
                result.error || this.getAttribute("failed") || messages.failed;
            return;
        }

        let message = this.getAttribute("done") || messages.done;
        message = message.replace("$DURATION", result.duration);
        this.innerHTML = `
            ${message}
            <span data-ref>• <a href="https://codapi.org/">codapi</a></span>`;
    }

    // showMessage shows a custom message.
    showMessage(message) {
        this.innerHTML = sanitize(message);
    }
}

export { CodapiStatus };
