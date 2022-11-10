// Đối tượng `Validator`
function Validator(options){
    var rulesSelector={};

    function Validate(inputElement, rule){
        var rules=rulesSelector[rule.selector];

        var errorMessage;
        var errorElement=inputElement.parentElement.querySelector('.form-message');
        for(let i=0; i<rules.length; i++){
            errorMessage=rules[i](inputElement.value)
            if(errorMessage){
                break
            }
        }
        
            if(errorMessage){
                
                errorElement.innerText=errorMessage;
                inputElement.parentElement.classList.add('invalid')
                
            }else{
                errorElement.innerText='';
                inputElement.parentElement.classList.remove('invalid')
            }
            return !errorMessage;
            
        
        

    }
    


var formElement=document.querySelector(options.form)
    if(formElement){
        var isFormValid=true;
        formElement.onsubmit=function(e){
            e.preventDefault()

            options.rules.forEach(function(rule){
                var inputElement=formElement.querySelector(rule.selector)
                var isValid= Validate(inputElement, rule)
                if(!isValid){
                    isFormValid=false
                }



            })
            if(isFormValid){
                if(typeof options.onSubmit==='function'){
                    
                    var enableInputs=formElement.querySelectorAll('[name]')
                    var formValues= Array.from(enableInputs).map(function(input){
                        return {
                            [input.name] : input.value ,
                        }
                    })
                    options.onSubmit(formValues)
                    

                }
            }

           
                

        }
        options.rules.forEach(function(rule){
           
            var inputElement=formElement.querySelector(rule.selector)

            if(inputElement){
                
                if(Array.isArray(rulesSelector[rule.selector])){
                    rulesSelector[rule.selector].push(rule.test)

                }else{
                    rulesSelector[rule.selector]=[rule.test]

                }
                inputElement.onblur=function(){
                    Validate(inputElement, rule)
                    
                }
                inputElement.oninput=function(){
                    var errorElement=inputElement.parentElement.querySelector('.form-message');
                    errorElement.innerText='';
                    inputElement.parentElement.classList.remove('invalid')
                }
            }
        })
    }



}
Validator.isRequired=function(selector){
    return {
        selector: selector,
        test: function(value){
           return value?undefined:'Vui lòng nhập trường này'

        }
    }
}
Validator.isEmail=function(selector){
    return {
        selector: selector,
        test: function(value){
            var regex=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            return regex.test(value)?undefined:'Trường này phải là email'
 
        }
    }

}
Validator.minLength=function(selector){
    return{
        selector:selector,
        test:function(value){
            return value.length>=6?undefined:'Trường này phải nhập tối thiểu 6 ký tự'

        }
    }
}
Validator.isConfirmed=function(selector, Getconfirmvalue, message){
    return{
        selector:selector,
        test: function(value){
            return value===Getconfirmvalue()?undefined:message||'Vui lòng nhập lại đúng mật khẩu'

        }
    }
}