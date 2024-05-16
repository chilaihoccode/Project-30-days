const products = [
    {
        id : 1,
        name : 'cafe da',
        price : 15000
    },
    {
        id : 2,
        name : 'cafe sua',
        price : 15000
    },
    {
        id : 3,
        name : 'cafe muoi',
        price : 18000
    }    
]

const selectDiv = document.querySelector('#product')
const btnSubmit = document.querySelector('.btnSubmit')
const tbodyDiv = document.querySelector('tbody')
const monneyText = document.querySelector('.money-text')

console.log(btnSubmit)


let currentIndex = ''
let listItem = []
let priceList = []



const list = {
    handlePrice : function () {
        let result = priceList.reduce((accumValue,currentValue) =>{
            return accumValue += currentValue
        },0)
        monneyText.innerText = `${result} VND`
    },
    renderItem : function () {
        let trSelector
        trSelector = listItem.map((mun,index) => {
                let priceItem = products[mun].price
                let itemName = products[mun].name
                priceList[index] = priceItem
                // console.log({itemName : itemName})
                // console.log(priceList)
                return (
                    `<tr>
                        <td>${index + 1}</td>
                        <td>${itemName}</td>
                        <td>${priceItem} VND</td>
                    </tr>`
                )
            })
            tbodyDiv.innerHTML = trSelector.join('')
            this.handlePrice()
        },
    handleAddList : function () {
        btnSubmit.addEventListener('click',() => {
            let valueSelected = selectDiv.value 
            products.forEach((item,index) => {
                if(item.name === valueSelected) {
                    listItem.push(index)
                    console.log(listItem)
                    this.renderItem()
                }
            })
            // console.log(a)
        })
    },
    renderSelect : function () {
        products.forEach((item,index) => {
            const option = document.createElement('option')
            selectDiv.append(option)
            option.innerText = item.name
            option.setAttribute('index',index)
        })
    },
    start : function () {
        this.renderSelect()
        this.handleAddList()
        // this.handlePrice()
    }
}
list.start()