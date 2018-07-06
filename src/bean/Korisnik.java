package bean;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;

import bean.enums.Uloga;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class Korisnik implements Serializable{
	private String username;
	private String pass;
	private String ime;
	private String prezime;
	private String telefon;
	private String email;
	private Uloga uloga;
	private Date datumRegistracije;
	
	private ArrayList<Porudzbina> porudzbine;
	private ArrayList<Integer> omiljeno;
	private ArrayList<Integer> dostavlja;
	private int vozi;
	public String getUsername() {
		return username;
	}
	public String getPass() {
		return pass;
	}
	public String getIme() {
		return ime;
	}
	public String getPrezime() {
		return prezime;
	}
	public String getTelefon() {
		return telefon;
	}
	public String getEmail() {
		return email;
	}
	public Uloga getUloga() {
		return uloga;
	}
	public Date getDatumRegistracije() {
		return datumRegistracije;
	}
	public ArrayList<Porudzbina> getPorudzbine() {
		return porudzbine;
	}
	public ArrayList<Integer> getOmiljeno() {
		return omiljeno;
	}
	public ArrayList<Integer> getDostavlja() {
		return dostavlja;
	}
	public int getVozi() {
		return vozi;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public void setPass(String pass) {
		this.pass = pass;
	}
	public void setIme(String ime) {
		this.ime = ime;
	}
	public void setPrezime(String prezime) {
		this.prezime = prezime;
	}
	public void setTelefon(String telefon) {
		this.telefon = telefon;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public void setUloga(Uloga uloga) {
		this.uloga = uloga;
	}
	public void setDatumRegistracije(Date datumRegistracije) {
		this.datumRegistracije = datumRegistracije;
	}
	public void setPorudzbine(ArrayList<Porudzbina> porudzbine) {
		this.porudzbine = porudzbine;
	}
	public void setOmiljeno(ArrayList<Integer> omiljeno) {
		this.omiljeno = omiljeno;
	}
	public void setDostavlja(ArrayList<Integer> dostavlja) {
		this.dostavlja = dostavlja;
	}
	public void setVozi(int vozi) {
		this.vozi = vozi;
	}
	public Korisnik() {
	}
	
	
	
	
	
	
}
