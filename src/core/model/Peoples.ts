class Peoples {
	name: string;
	code: string;
	member_status: string;
	position: string;
	study_program: string;
	biography: string;
	expertise: string;
	research_and_publication: string;
	linkedin_link: string;
	github_link: string;
	instagram_link: string;
	email: string;	
	profile_picture: string;

	constructor(name: string, code: string, member_status: string, position: string, study_program: string, biography: string, expertise: string, research_and_publication: string, linkedin_link: string, github_link: string, instagram_link: string, email: string, profile_picture: string) {
		this.name = name;
		this.code = code;
		this.member_status = member_status;
		this.position = position;
		this.study_program = study_program;
		this.biography = biography;
		this.expertise = expertise;
		this.research_and_publication = research_and_publication;
		this.linkedin_link = linkedin_link;
		this.github_link = github_link;
		this.instagram_link = instagram_link;
		this.email = email;
		this.profile_picture = profile_picture;
	}


}

export default Peoples;