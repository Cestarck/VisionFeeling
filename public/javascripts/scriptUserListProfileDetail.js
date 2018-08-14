    let stockDate =Object.keys(joyStock);
    
    console.log(joyStock);
    let stockLevel = Object.values(joyStock);
    
    let ctx = document.getElementById('userChart').getContext('2d');
    let chart = new Chart(ctx,{
        type: 'line',
        data: {
            labels: stockDate,
            datasets: [{
                label: "Feliz",
                
                borderColor: 'rgb(255, 99, 132)',
                data: stockLevel,
            },
            {
                label: "Feliz",
                
                borderColor: 'rgb(255, 99, 132)',
                data: stockLevel,
            },
            {
                label: "Feliz",
                
                borderColor: 'rgb(255, 99, 132)',
                data: stockLevel,
            },
        ]
        }
    })
