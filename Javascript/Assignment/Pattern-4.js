function printPattern() {
    let size = 5;
    
    for (let i = 1; i <= size; i++) {
        let row = "";

        for (let j = 1; j <= size; j++) {
            if (j === i || j === size - i + 1) {
                row += j; 
            } else {
                row += " "; 
            }
        }
        console.log(row);
    }
}

printPattern();
