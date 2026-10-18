
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".buttons button");
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent;

        if (value === "AC") {
            display.value = "";
        }
        else if (value === "DEL") {
            display.value = display.value.slice(0, -1);
        }
        else if (value === "=") {
            try {
                if (display.value.trim() === "") {
                    return;
                }

                const expression = display.value;
                if (!/^[0-9+\-*/%.()\s]+$/.test(expression)) {
                    display.value = "Error";
                    return;
                }
                const result = Function(
                    '"use strict"; return (' + expression + ')'
                )();

                display.value = Number.isFinite(result)
                    ? Number(result.toPrecision(12)).toString()
                    : "Error";
            } catch {
                display.value = "Error";
            }
        }
        else {
            if (display.value === "Error") {
                display.value = "";
            }

            display.value += value;
        }
    });
});

document.addEventListener("keydown", function(event) {
    const key = event.key;
    if (/^[0-9+\-*/%.()]$/.test(key)) {
        if (display.value === "Error") {
            display.value = "";
        }

        display.value += key;
    }
    else if (key === "Enter" || key === "=") {
        event.preventDefault();

        document.querySelector(".equal").click();
    }

    else if (key === "Backspace") {
        display.value = display.value.slice(0, -1);
    }
    else if (key === "Escape" || key === "Delete") {
        display.value = "";
    }
});
