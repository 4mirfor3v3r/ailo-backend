class Peoples {
	name: string;
	email: string;
	password: string;
	constructor(name:string, email:string, password:string){
		this.name = name;
		this.email = email;
		this.password = password;
	}

	static getInstace(name:string, email:string, password:string){
		return new Peoples(name, email, password);
	}
}

export default Peoples;