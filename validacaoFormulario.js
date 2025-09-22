class Handler { // a classe base do exemplo
  setNext(next) { // seta o próximo handler na corrente
    this.next = next;
    return next;
  }

  handle(request) { // aqui o handle tenta processar a requisição realizada
    if (this.next) return this.next.handle(request);
  }
}

class NotEmptyValidator extends Handler {
  handle(request) {
    if (!request) { // aqui eu verifico se esta null, undefined, ou vazio mesmo
      console.log("Erro: campo vazio!");
      return;
    }
    return super.handle(request); // se der tudo certo o codigo passa para o próximo handle da corrente
  }
}

class EmailValidator extends Handler {
  handle(request) {
    if (!request.includes("@")) { //aqui eu verifico na requisição se a string passada é um email valido;
      console.log("Erro: e-mail inválido!"); 
      return;
    }
    return super.handle(request); 
  }
}

// Aqui eu configuro a cadeia da requisição
const validator = new NotEmptyValidator(); // validator recebe a classe de valor vazio
validator.setNext(new EmailValidator()); // e aqui eu envio o próximo passo da corrente de verificação


validator.handle("");         // (nem chega no EmailValidator, porque falhou logo no primeiro)
validator.handle("teste");    // (passou no NotEmptyValidator, mas falhou no EmailValidator)
validator.handle("a@b.com");  // Nada é impresso (porque passou nos dois validadores e não tem mais próximos)