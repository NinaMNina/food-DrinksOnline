package DTO;

import bean.enums.Uloga;

public class KorisnikDTO {
	private String username;
	private String pass;
	private Uloga uloga;
	public String getUsername() {
		return username;
	}
	public String getPass() {
		return pass;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public void setPass(String pass) {
		this.pass = pass;
	}
	public Uloga getUloga() {
		return uloga;
	}
	public void setUloga(Uloga uloga) {
		this.uloga = uloga;
	}
	public KorisnikDTO(){
		
	}
}
