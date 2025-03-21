function pattern3(n){
    for(let i = 1; i <=n; i++){
        str = '';
        str += ' '.repeat((n-i) * 2);

        for(let j = 1; j<=i;j++){
            str += j + ' ';
        }
        for(let j = i-1; j>=1; j--){
            str += j + ' ';
        }
    console.log(str)
    }
}
let n = 5;
pattern3(n);


