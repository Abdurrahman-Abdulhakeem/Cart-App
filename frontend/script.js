const deliverCount = document.getElementById('deliverCount');

// getRegister input
const registerForm = document.getElementById('register-form');
const firstName = document.getElementById('firstname');
const username = document.getElementById('username');
const password = document.getElementById('password');
const cPassword = document.getElementById('c-password');

// getLogin input
const registerFormLogin = document.getElementById('register-form-login');
const usernameLogin = document.getElementById('username-login');
const passwordLogin = document.getElementById('password-login');
const userNameDisplay = document.getElementById('user-name-display');

// getProductImages
const homeProduct = document.getElementById('prod-img');
const productImages = document.querySelectorAll('.product-img');

// const formControl = document.querySelectorAll('.form-control');
const customerCount = document.getElementById('customerCount');
const countryCount = document.getElementById('countryCount');
const boxFlex = document.querySelectorAll('.num-flex');
const getTop = document.querySelectorAll('.getTop');
const arrowUp = document.querySelector('.arrow-up');
const errMsg = document.querySelector('.err-msg');
const myNumber = 1235;

let i = 0;

window.addEventListener('scroll', runNumber)

runNumber();

function runNumber() {
    const triggerBottom = window.innerHeight / 5 * 4;
    const triggerBottom2 = window.innerHeight / 8 * 4;

    getTop.forEach(getBox => {
        const getBoxTop = getBox.getBoundingClientRect().top;

        if (getBoxTop < triggerBottom2) {
            arrowUp.style.display = 'block'

        } else {
            arrowUp.style.display = 'none'
        }
    });

    boxFlex.forEach(box => {
        const boxTop = box.getBoundingClientRect().top;

        if (boxTop < triggerBottom) {
            setInterval(() => {
                if (i < myNumber) {
                    i++
                    deliverCount.innerHTML = `+${i}`;
                }

                if (i < myNumber - 500) {
                    i++
                    customerCount.innerHTML = `+${i}`;
                }

                if (i < myNumber - 1000) {
                    i++
                    countryCount.innerHTML = `+${i} Countries`;
                }
            }, 100)
        }
    });

}


// Register User
if (registerForm) {
    registerForm.addEventListener('submit', authRegisterInfo);
    // registerFormLogin.addEventListener('submit', authRegisterInfo);
}

function authRegisterInfo(e) {
    e.preventDefault();
    if (password.value !== cPassword.value) {
        setErrorFor(cPassword, 'Password does not match!')
    }else {
        setErrorFor(cPassword, '')
    }
    
    if (password.value.length < 6) {
        setErrorFor(password, 'Password too short')
    }else {
        setErrorFor(password, '')
    }

}


function setErrorFor(input, message) {
    const selectErrorTag = input.parentElement;
    const small = selectErrorTag.querySelector('small');

    // add error message inside small
    small.innerText  = message;
    setTimeout(() => small.remove(), 3000)
}



const divAlert = document.createElement('div')

const baseEndPoint = 'http://localhost:8000/cart'

if (registerForm) {
    registerForm.addEventListener('submit', handleRegister)
}

function handleRegister(e) {

    e.preventDefault();
    const registerEndpoint = `${baseEndPoint}/create-account/`

    const detail = {
        first_name: firstName.value,
        username: username.value,
        password: password.value
    }
    

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(detail)
    }

    if (password.value === cPassword.value) {
        fetch(registerEndpoint, options)
        .then(res=> {
            if (res.status === 200  || res.redirected === true) {
                divAlert.innerHTML='';
                divAlert.style.display = 'block'
                noticeTheUser('Account Created Successfully!', 'green')
                firstName.value = ''
                username.value = ''
                password.value = ''
                cPassword.value = ''

                setTimeout(() => {
                    window.open('http://localhost:5500/frontend/login.html')
                }, 1000)

            }
       
            else {
                divAlert.innerHTML='';
                divAlert.style.display = 'block'    
                noticeTheUser('Failed to create account, try changing your username or password!', 'red')
            }
            console.log(res)
            return res.json()
        })
        .then(data=> console.log(data))
        .catch(err=> console.log('err', err))

    }

}

function noticeTheUser(message, color) {
    const myPopUp = document.getElementById('alert')
    divAlert.appendChild(document.createTextNode(message))
    registerForm.insertBefore(divAlert, myPopUp)
    divAlert.style.color = color
    divAlert.className = 'alert'

    setTimeout(() => divAlert.remove(), 3000)
}



// Login User
if(registerFormLogin){
    registerFormLogin.addEventListener('submit', handleLogin)
}

function handleLogin(e) {
    e.preventDefault();

    const loginEndpoint = 'http://localhost:8000/api/token/';

    const details = {
        username: usernameLogin.value,
        password: passwordLogin.value
    }

    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('access')}`
        },
        body: JSON.stringify(details)
    }

    fetch(loginEndpoint, options)
    .then(res=> {
        if (res.status == 200) {
            gotoDashboard()
        }
        else {
            closeDashboard()
        }
        console.log(res)
        return res.json()
    })
    .then(data=> {
        localStorage.setItem('access', data.access)
        localStorage.setItem('refresh', data.refresh)
        console.log(data)
    })
    .catch(err=> console.log('err', err))
}

function gotoDashboard() {
   
    usernameLogin.value = '';
    passwordLogin.value = '';
    setTimeout(() => {
        window.open('http://localhost:5500/frontend/dashboard.html')
    }, 1000);
}

function closeDashboard() {
    window.close('http://localhost:5500/frontend/dashboard.html')
    const myPopUp = document.getElementById('alert2');
    divAlert.innerHTML = '';
    divAlert.appendChild(document.createTextNode('Invalid Login Credentials'));
    registerFormLogin.insertBefore(divAlert, myPopUp);
    divAlert.style.color = 'red';
    setTimeout(() => divAlert.remove(), 3000);
}

// Display Home Page Goods

function displayHomeProducts() {
    const options = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    }

    fetch(baseEndPoint, options)
    .then(res=> {
        console.log(res)
        return res.json()
    })
    .then(data=> {
        fetchHomeGoods(data)
    
        // console.log(data)
    })
    .catch(err=> console.log('err', err))

}

displayHomeProducts()

function fetchHomeGoods(mapData) {
    mapData.forEach((data, idx)=> {
        let imgSet = document.createElement('img');
        imgSet.setAttribute('src', data.product_image)
        imgSet.setAttribute('data-id', idx)
        // console.log(imgSet, data.product_image)
        if (homeProduct) {
            homeProduct.appendChild(imgSet)
        }
       
        // console.log(mapData[0].product_name)
        // userNameDisplay.innerText = `Welcome ${data.owner.username}`
        
    })
    
    // dashboard product
    if (productImages) {
        productImages.forEach((productImage, index)=> {
            let pName = document.createElement('p');
                pName.appendChild(document.createTextNode(mapData[index].product_name))
    
                let imgSet2 = document.createElement('img');
                imgSet2.setAttribute('src', mapData[index].product_image)
    
                let pPrice = document.createElement('p');
                pPrice.appendChild(document.createTextNode(`$${mapData[index].price}`))

                let cartLink = document.createElement('a');
                cartLink.setAttribute('href', ''); 
                cartLink.appendChild(document.createTextNode('Cart'));
                cartLink.className = 'buy'
                productImage.append(pName, imgSet2, pPrice, cartLink)
            // })
        })

    }

    // let a = ['Goods', 'Goods1', 'Goods2']

    // productImages.forEach((productImage, idx)=> {
    // let x = document.createElement('p')
    // x.appendChild(document.createTextNode(a[idx]))
    //     productImage.appendChild(x)
    //     console.log(x)
    // })


  
}


function orderListCreate() {
    const options = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    }

    const endpoint = `${baseEndPoint}/orders`

    fetch(endpoint, options)
    .then(res=> {
        console.log(res)
        return res.json()
    })
    .then(data=> {
        // fetchListGoods()
    
        console.log(data)
    })
    .catch(err=> console.log('err', err))
}

orderListCreate()

// function fetchListGoods() {

//     productImages.forEach(productImage=> productImage.addEventListener('click', runCart))

 
    
//     function runCart(e) {
//         e.preventDefault()
//         console.log('clicked');
    

//     }

// }
// runCart()
// const cartEach = document.querySelectorAll('.buy');
// cartEach.forEach((cart, idx)=> {
//     pElement = cart[idx].parentElement
//     console.log(cart)
//     console.log(1)
// })





// fetch('http://localhost:8000/api/token/', options)
// .then(res=> res.json())
// .then(data=> {
//     // myImg = document.createElement('img')
//     // myImg.setAttribute('src', data[4].product_image)
//     // me.appendChild(myImg)
//     console.log(data)

    
//     // data.forEach(pro=> console.log(pro.product_name))
//     // console.log(data[4].product_image)
// })
// .catch(err=> console.log('err', err))


// Register Form



