package bean;

import java.io.Serializable;

public class Jelo implements Serializable{
	private int id;
	private int idRestorana;
	private String naziv;
	private String opis;
	private int cena;
	private int grama;
	private boolean activ;
	
	
	public boolean isActiv() {
		return activ;
	}
	public void setActiv(boolean activ) {
		this.activ = activ;
	}
	public int getId() {
		return id;
	}
	public int getIdRestorana() {
		return idRestorana;
	}
	public String getNaziv() {
		return naziv;
	}
	public String getOpis() {
		return opis;
	}
	public int getCena() {
		return cena;
	}
	public int getGrama() {
		return grama;
	}
	public void setId(int id) {
		this.id = id;
	}
	public void setIdRestorana(int idRestorana) {
		this.idRestorana = idRestorana;
	}
	public void setNaziv(String naziv) {
		this.naziv = naziv;
	}
	public void setOpis(String opis) {
		this.opis = opis;
	}
	public void setCena(int cena) {
		this.cena = cena;
	}
	public void setGrama(int grama) {
		this.grama = grama;
	}
	public Jelo() {
	}
	
	
}
