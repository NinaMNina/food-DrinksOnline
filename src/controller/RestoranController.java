package controller;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import jsonData.Data;
import jsonData.JsonSerializer;
import bean.Jelo;
import bean.Pice;
import bean.Restoran;
import bean.enums.Kategorija;

@Path("/restoran")
public class RestoranController {

	@POST
	@Path("/dodaj")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response dodajRestoran(Restoran r) {	
	//	k.setDatumRegistracije(new Date(k.getDatumRegistracije()));
		System.out.println("tu sam i kreiram restoran");
		r.setId(Data.getInstance().getRestorani().size());
		Data.getInstance().getRestorani().add(r);
		JsonSerializer.saveData();
		return Response.ok(r, MediaType.APPLICATION_JSON).build();
	}
	
	@GET
	@Path("/svisvi")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response basSviRestorani() {	
	//	k.setDatumRegistracije(new Date(k.getDatumRegistracije()));
		System.out.println("tu sam i dobavnljam sve sve restorane");
		List<Restoran> r = Data.getInstance().getRestorani();
		JsonSerializer.saveData();
		return Response.ok(r, MediaType.APPLICATION_JSON).build();
	}
	@GET
	@Path("/svi")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response sviRestorani() {	
	//	k.setDatumRegistracije(new Date(k.getDatumRegistracije()));
		System.out.println("tu sam i dobavnljam restorane");
		List<Restoran> r = Data.getInstance().getRestorani();
		ArrayList<Restoran> r0 = new ArrayList<Restoran>();
		JsonSerializer.saveData();
		for(int i=0; i<r.size(); i++){
			if(r.get(i).isActiv()){
				r0.add(r.get(i));
			}
		}
		return Response.ok(r0, MediaType.APPLICATION_JSON).build();
	}
	@GET
	@Path("/{c}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response restoraniPoKategoriji(@PathParam("c") String c) {	
	//	k.setDatumRegistracije(new Date(k.getDatumRegistracije()));
		System.out.println("tu sam i dobavnljam restorane po kategoriji");
		List<Restoran> r = Data.getInstance().getRestorani();
		ArrayList<Restoran> r0 = new ArrayList<Restoran>();
		Kategorija kk = null;
		switch(c){
			case "hc":
				kk=Kategorija.DOMACA;
				break;
			case "bbq":
				kk=Kategorija.ROSTILJ;
				break;
			case "p":
				kk=Kategorija.PICERIJA;
				break;
			case "i":
				kk=Kategorija.INDIJSKA;
				break;
			case "k":
				kk=Kategorija.KINESKA;
				break;
			case "b":
				kk=Kategorija.POSLASTICARNICA;
				break;
			default: break;
		}
			
		for(int i=0; i<r.size(); i++){
			if(r.get(i).isActiv() && r.get(i).getKategorija().equals(kk)){
				r0.add(r.get(i));
			}
		}
		return Response.ok(r0, MediaType.APPLICATION_JSON).build();
	}
	@POST
	@Path("/izmeni")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response izmeniRestoran(Restoran r) {	
	//	k.setDatumRegistracije(new Date(k.getDatumRegistracije()));
		System.out.println("tu sam i menjam restoran");
		izmeni(r);
		JsonSerializer.saveData();
		return Response.ok(r, MediaType.APPLICATION_JSON).build();
	}
	@DELETE
	@Path("/brisi/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response brisiRestoran(@PathParam("id") int id) {	
	//	k.setDatumRegistracije(new Date(k.getDatumRegistracije()));
		System.out.println("tu sam i brisem restoran");
		List<Restoran> r = Data.getInstance().getRestorani();
		for(int index=0; index<r.size(); index++){
			if(r.get(index).getId()==id){
				r.get(index).setActiv(false);
				setNotActiv(r.get(index));
			}
		}
		JsonSerializer.saveData();
		return Response.ok(null, MediaType.APPLICATION_JSON).build();
	}

	
	
	private void setNotActiv(Restoran r) {
		for(Jelo j : r.getJela()){
			j.setActiv(false);
		}
		for(Pice p : r.getPica()){
			p.setActiv(false);
		}
	}

	private void izmeni(Restoran r) {
		List<Restoran> all = Data.getInstance().getRestorani();
		for(int i=0; i<all.size(); i++){
			if(all.get(i).getId()==r.getId()){
				Data.getInstance().getRestorani().set(i, r);
				return;
			}
		}
	}
}
