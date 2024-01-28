class Peoples {
	name: string;
	code: string;
	position: string;
	study_program: string;
	biography: string;
	expertise: string;
	research_and_publication: string;
	linkedin_link: string;
	github_link: string;
	instangram_link: string;
	email_link: string;

	constructor(name: string, code: string, position: string, study_program: string, biography: string, expertise: string, research_and_publication: string, linkedin_link: string, github_link: string, instangram_link: string, email_link: string) {
		this.name = name;
		this.code = code;
		this.position = position;
		this.study_program = study_program;
		this.biography = biography;
		this.expertise = expertise;
		this.research_and_publication = research_and_publication;
		this.linkedin_link = linkedin_link;
		this.github_link = github_link;
		this.instangram_link = instangram_link;
		this.email_link = email_link;
	}
}

export default Peoples;