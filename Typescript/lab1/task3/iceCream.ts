function calculateTotalPrice(): void {
    const size = prompt("Enter the size of the ice cream (small, large):");

    let totalPrice: number = 0;

    if (size === "small") {
        totalPrice += 10;
    } else if (size === "large") {
        totalPrice += 25;
    } else {
        console.log("Invalid size entered. Please enter 'small' or 'large'.");
        return;
    }

    const toppings = prompt("Enter the toppings (comma-separated):\nchoices: chocolate (+5), caramel (+6), berry (+10)");

    if (!toppings || toppings.trim() === "") {
        alert("No toppings selected. ");
        return;
    }

    const toppingsArray: string[] = toppings.split(",").map(topping => topping.trim().toLowerCase());

    if (toppingsArray.includes("chocolate")) totalPrice += 5;
    if (toppingsArray.includes("caramel")) totalPrice += 6;
    if (toppingsArray.includes("berry")) totalPrice += 10;


    const marshmallow = prompt("Do you want to add marshmallow? (+5) (yes/no):");
    if (marshmallow === "yes") {
        totalPrice += 5;
    }

    console.log(`Total Price: $${totalPrice}`);

    alert(`Total Price: $${totalPrice}`);
}

calculateTotalPrice();