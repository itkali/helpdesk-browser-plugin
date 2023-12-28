const tbody = document.querySelectorAll('.wiki > table');
const subject = document.querySelector('.subject > div > h3');
const getMailDomain = document.querySelector('.wiki > table ~ p');
const currentProject = document.querySelector('.current-project');

try{
    if (subject.textContent.includes("Создание пользователя")){
        function generatePassword(){
            const charactedList = '23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz';
            let tempPassword = '';
        
            for (let i = 0; i < 8; i++){
                const charactedIndex = Math.round(Math.random() * charactedList.length);
                tempPassword += charactedList.charAt(charactedIndex);
            }
            return tempPassword;
        }
        
        function translitLogin(login){
            let tempLogin = '';
              const converter = {
                'а': 'a',    'б': 'b',    'в': 'v',    'г': 'g',    'д': 'd',
                'е': 'e',    'ё': 'e',    'ж': 'zh',   'з': 'z',    'и': 'i',
                'й': 'y',    'к': 'k',    'л': 'l',    'м': 'm',    'н': 'n',
                'о': 'o',    'п': 'p',    'р': 'r',    'с': 's',    'т': 't',
                'у': 'u',    'ф': 'f',    'х': 'h',    'ц': 'c',    'ч': 'ch',
                'ш': 'sh',   'щ': 'sch',  'ь': '',     'ы': 'y',    'ъ': '',
                'э': 'e',    'ю': 'yu',   'я': 'ya',
             
                'А': 'A',    'Б': 'B',    'В': 'V',    'Г': 'G',    'Д': 'D',
                'Е': 'E',    'Ё': 'E',    'Ж': 'Zh',   'З': 'Z',    'И': 'I',
                'Й': 'Y',    'К': 'K',    'Л': 'L',    'М': 'M',    'Н': 'N',
                'О': 'O',    'П': 'P',    'Р': 'R',    'С': 'S',    'Т': 'T',
                'У': 'U',    'Ф': 'F',    'Х': 'H',    'Ц': 'C',    'Ч': 'Ch',
                'Ш': 'Sh',   'Щ': 'Sch',  'Ь': '',     'Ы': 'Y',    'Ъ': '',
                'Э': 'E',    'Ю': 'Yu',   'Я': 'Ya'
              };
          
              for (var i = 0; i < login.length; ++i ) {
                if (converter[login[i]] == undefined){
                    tempLogin += login[i];
                } else {
                    tempLogin += converter[login[i]];
                }
              }
              return tempLogin;
        }
        
        [...tbody].forEach(preEl => {
            
            const root = document.createElement("div");
            root.style.width = '100%';
            root.style.display = 'flex';
            root.style.flexDirection = 'column';
            root.style.gap = '5px';

            const textarea = document.createElement('textarea');
            textarea.style.height = '170px';
            textarea.style.width = '100%';
            textarea.readOnly = true;
        
            const button = document.createElement('button');
            button.innerHTML = 'Скопировать';
            button.type = 'button';
            button.style.width = '150px';
            button.style.fontSize = '14px';
            button.style.padding = '10px';
            button.style.float = 'left';
            button.style.borderRadius = '5px';
            button.style.backgroundColor = '#1dc039';
            button.style.color = 'white';
            button.style.border = 'none';
            button.style.cursor = 'pointer';
            
            root.appendChild(textarea);
            root.appendChild(button);
        
            const tableEl = preEl.querySelector('tbody > tr');
            const array = tableEl.textContent.split("\n")
            const fio = array[2];
            const surname = array[2].split(" ")[0];
            const oneSymbolName = array[2].split(" ")[1].split('')[0];
            const login = oneSymbolName + surname;
             
            let mainDomain = '';
            getMailDomain.textContent.split("\n").forEach(elem => {
                if (elem.includes("Корпоративная почта")){
                    mainDomain = elem.split("(")[1].slice(0, -1);
                };
            });
            switch(currentProject.textContent.toLowerCase()){
                case 'бизнес-юрист':
                case 'ситиарбитр':
textarea.textContent = `
Единая учетная запись в домене:
Логин: ${login}
Пароль: ${generatePassword()}
Отдельным письмом отправлено приглашение в Битрикс24
Так же необходимо ознакомиться с данной инструкцией: http://hbu.3it.ru/questions/99-lichnye-dokumenty-na-udalennyh-serverah-domashnyaya-papka-home

Почта:
${fio}
Почтовый ящик: ${translitLogin(login) + mainDomain}
Пароль: ${generatePassword()}`;
                break;

                default: 
                textarea.style.height = '90px';
                textarea.textContent = `
Единая учетная запись в домене:
${fio}
Логин: ${translitLogin(login).toLowerCase()}
Пароль: ${generatePassword()}`
            };

            preEl.after(root);
            // preEl.after(textarea);
            
            button.addEventListener('click', () => {
                navigator.clipboard.writeText(textarea.textContent);
                button.innerHTML = 'Скопировано!';
                button.style.backgroundColor = '#189a2e';
            })
        })    
    }
} catch(err) {

}

