import firebase from '../../config/firebase';

export const signUpEmail = async (email, senha) => {
    await firebase.auth().createUserWithEmailAndPassword(email, senha).then(() => {

        firebase.auth().currentUser.sendEmailVerification().then(() => {
        }).catch((error) => {
          alert('ocorreu um erro ao enviar o email')
        })
  
        alert('Usuário Cadastrado com Sucesso!')
      }).catch((error) => {
        if(error.code === 'auth/email-already-exists') {
          alert('Esse endereço de email já está em uso, por favor tente outro')
          return;
        } else if (error.code === 'auth/internal-error') {
          return;
        } else if (error.code === 'auth/invalid-password') {
          alert('A senha inserida é inválida')
          return;
        } else if (error.code === 'auth/weak-password') {
          alert('A senha inserida é muito fraca, ela precisa ter ao mínimo 6 caracteres')
          return;
        }
      })
}