package bean;

import java.io.Serializable;
import java.sql.Date;
import java.sql.Time;
import java.util.ArrayList;

import bean.enums.StatusPorudzbine;

public class Porudzbina implements Serializable{
	private int id;
	private String korisnik;
	private int idRestorana;
	private String nazivRestorana;
	private String napomena;
	private Date vreme;
	private StatusPorudzbine status;
	private String dostavljac;
	private boolean activ;
	private int cena;
	private ArrayList<Stavka> stavke;
	public int getId() {
		return id;
	}
	public String getKorisnik() {
		return korisnik;
	}
	public int getIdRestorana() {
		return idRestorana;
	}
	public String getNazivRestorana() {
		return nazivRestorana;
	}
	public String getNapomena() {
		return napomena;
	}
	public Date getVreme() {
		return vreme;
	}
	public StatusPorudzbine getStatus() {
		return status;
	}
	public String getDostavljac() {
		return dostavljac;
	}
	public ArrayList<Stavka> getStavke() {
		return stavke;
	}
	public void setId(int id) {
		this.id = id;
	}
	public void setKorisnik(String korisnik) {
		this.korisnik = korisnik;
	}
	public void setIdRestorana(int idRestorana) {
		this.idRestorana = idRestorana;
	}
	public void setNazivRestorana(String nazivRestorana) {
		this.nazivRestorana = nazivRestorana;
	}
	public void setNapomena(String napomena) {
		this.napomena = napomena;
	}
	public void setVreme(Date vreme) {
		this.vreme = vreme;
	}
	public void setStatus(StatusPorudzbine status) {
		this.status = status;
	}
	public void setDostavljac(String dostavljac) {
		this.dostavljac = dostavljac;
	}
	public void setStavke(ArrayList<Stavka> stavke) {
		this.stavke = stavke;
	}
	public boolean isActiv() {
		return activ;
	}
	public int getCena() {
		return cena;
	}
	public void setActiv(boolean activ) {
		this.activ = activ;
	}
	public void setCena(int cena) {
		this.cena = cena;
	}
	public Porudzbina() {
	}
	
	
	

}
