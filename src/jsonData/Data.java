package jsonData;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.PriorityQueue;

import DTO.ArtikalDTO;
import bean.Jelo;
import bean.Korisnik;
import bean.Pice;
import bean.Porudzbina;
import bean.Restoran;
import bean.Stavka;
import bean.Vozilo;
import bean.enums.StatusPorudzbine;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class Data implements Serializable{
	private ArrayList<Korisnik> korisnici;
	private ArrayList<Restoran> restorani;
	private ArrayList<Vozilo> vozila;
	private static Data data=null;
	
	public static Data getInstance(){
		if(data==null){
			data = JsonSerializer.loadData();
		}
		return data;
	}
	
	public ArrayList<Korisnik> getKorisnici() {
		return korisnici;
	}


	public ArrayList<Restoran> getRestorani() {
		return restorani;
	}


	public ArrayList<Vozilo> getVozila() {
		return vozila;
	}


	public void setKorisnici(ArrayList<Korisnik> korisnici) {
		this.korisnici = korisnici;
	}


	public void setRestorani(ArrayList<Restoran> restorani) {
		this.restorani = restorani;
	}


	public void setVozila(ArrayList<Vozilo> vozila) {
		this.vozila = vozila;
	}


	public Data() {

	}
	@JsonIgnore
	public int getJelaLength() {
		return getFinalLength();
	}
	@JsonIgnore
	public int getPicaLength() {
		return getFinalLength();
	}
	@JsonIgnore
	public int getFinalLength() {
		int retVal=0;
		for(Restoran r0 : restorani){
			retVal+=r0.getPica().size();
			retVal+=r0.getJela().size();
		}
		return retVal;
	}
	

	@JsonIgnore
	public void addJelo(Jelo j) {
		for(Restoran r0 : restorani){
			if(r0.getId()==j.getIdRestorana()){
				r0.getJela().add(j);
			}
		}
	}

	@JsonIgnore
	public void addPice(Pice j) {
		for(Restoran r0 : restorani){
			if(r0.getId()==j.getIdRestorana()){
				r0.getPica().add(j);
			}
		}
	}
	@JsonIgnore
	public int getPorudzbinaLength() {
		int retVal=0;
		for(Korisnik k0 : korisnici){
			retVal+=k0.getPorudzbine().size();
		}
		return retVal;
	}

	@JsonIgnore
	public Porudzbina getObavljamPorudzbinu(String un) {
		Porudzbina ret = null;
		for(Korisnik k : korisnici){
			for(Porudzbina p0 : k.getPorudzbine()){
				if(p0.getDostavljac().equals(un) && p0.getStatus().equals(StatusPorudzbine.UTOKU));
					return p0;
			}
		}
		return ret;
	}

	@JsonIgnore
	public List<ArtikalDTO> getTop() {
		List<ArtikalDTO> svi = new ArrayList<>();
		List<ArtikalDTO> top = new ArrayList<>();
		HashMap<Integer, Integer> hm = new HashMap<Integer, Integer>();
		for(Korisnik k0: korisnici){
			for(Porudzbina p0: k0.getPorudzbine()){
				for(Stavka s0 : p0.getStavke()){
					if(hm.containsKey(s0.getIdArtikla())){
						int value = hm.get(s0.getIdArtikla());
						hm.put(s0.getIdArtikla(), ++value);
				//		System.out.println("dodejm   "+s0.getIdArtikla()+"-->" + value);
					}
					else{
						hm.put(s0.getIdArtikla(), 1);
				//		System.out.println("pravim..."+s0.getIdArtikla());
					}
				}
			}
		}
		List<Entry<Integer, Integer>> greatest = findGreatest(hm, 10);
		ArrayList<Integer> ids = new ArrayList();
		for(Entry<Integer, Integer> entry : greatest){
			ids.add(entry.getKey());
		}
		int count = 1;
		for(Restoran r0: restorani){
			for(Jelo j0 : r0.getJela()){
				if(ids.contains(j0.getId())){
					top.add(toAtrikalDTO(r0, j0));
			//		System.out.println(count +". - "+ j0.getNaziv()+"["+j0.getId()+"]" + "-->" + hm.get(j0.getId()));
					count++;
				}
			}
			for(Pice p0 : r0.getPica()){
				if(ids.contains(p0.getId())){
					top.add(toAtrikalDTO(r0, p0));
			//		System.out.println(count +". - "+ p0.getNaziv()+"["+p0.getId()+"]" +"-->" + hm.get(p0.getId()));
					count++;
				}
			}
		}
		return top;
	}
	@JsonIgnore
	private ArtikalDTO toAtrikalDTO(Restoran r0, Jelo j0) {
		ArtikalDTO a = new ArtikalDTO();
		a.setCena(j0.getCena());
		a.setKolicina(j0.getGrama());
		a.setMera("g");
		a.setNaziv(j0.getNaziv());
		a.setOpis(j0.getOpis());
		a.setrAdresa(r0.getAdresa());
		a.setrNaziv(r0.getNaziv());
		return a;
	}
	@JsonIgnore
	private ArtikalDTO toAtrikalDTO(Restoran r0, Pice j0) {
		ArtikalDTO a = new ArtikalDTO();
		a.setCena(j0.getCena());
		a.setKolicina(j0.getMililitara());
		a.setMera("ml");
		a.setNaziv(j0.getNaziv());
		a.setOpis(j0.getOpis());
		a.setrAdresa(r0.getAdresa());
		a.setrNaziv(r0.getNaziv());
		return a;
	}

	@JsonIgnore
	private static <K, V extends Comparable<? super V>> List<Entry<K, V>> findGreatest(Map<K, V> map, int n){
	    Comparator<? super Entry<K, V>> comparator = new Comparator<Entry<K, V>>(){
	        @Override
	        public int compare(Entry<K, V> e0, Entry<K, V> e1){
	            V v0 = e0.getValue();
	            V v1 = e1.getValue();
	            return v0.compareTo(v1);
	        }
	    };
	    PriorityQueue<Entry<K, V>> highest = new PriorityQueue<Entry<K,V>>(n, comparator);
	    for (Entry<K, V> entry : map.entrySet()){
	        highest.offer(entry);
	        while (highest.size() > n){
	            highest.poll();
	        }
	    }	
	    List<Entry<K, V>> result = new ArrayList<Map.Entry<K,V>>();
	    while (highest.size() > 0){
	        result.add(highest.poll());
	    }
    	return result;
	}

	
}
