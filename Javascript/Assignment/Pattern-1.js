function pattern1(n){
    for(let i=1;i<=n;i++){
        let result = "*".repeat(i) + " ".repeat(2*(n - i)) + "*".repeat(i);
        console.log(result);
    }
    for(let i=n-1;i>=1;i--){
        let result = "*".repeat(i) + " ".repeat(2*(n - i)) + "*".repeat(i);
        console.log(result);
    }
}
let n = 4;
pattern1(n);