package controller;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import jsonData.Data;
import jsonData.JsonSerializer;
import bean.Vozilo;

@Path("/vozilo")
public class VoziloController {
	@POST
	@Path("/dodaj")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response dodajVozilo(Vozilo r) {	
	//	k.setDatumRegistracije(new Date(k.getDatumRegistracije()));
		System.out.println("tu sam i kreiram Vozilo");
		r.setId(Data.getInstance().getVozila().size());
		Data.getInstance().getVozila().add(r);
		JsonSerializer.saveData();
		return Response.ok(r, MediaType.APPLICATION_JSON).build();
	}
	
	@GET
	@Path("/svisvi")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response basSvaVozila() {	
	//	k.setDatumRegistracije(new Date(k.getDatumRegistracije()));
		System.out.println("tu sam i dobavnljam sva sva Vozila");
		List<Vozilo> r = Data.getInstance().getVozila();
		JsonSerializer.saveData();
		return Response.ok(r, MediaType.APPLICATION_JSON).build();
	}
	@GET
	@Path("/svi")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response svaVozila() {	
	//	k.setDatumRegistracije(new Date(k.getDatumRegistracije()));
		System.out.println("tu sam i dobavnljam Vozila");
		List<Vozilo> r = Data.getInstance().getVozila();
		ArrayList<Vozilo> r0 = new ArrayList<Vozilo>();
		JsonSerializer.saveData();
		for(int i=0; i<r.size(); i++){
			if(r.get(i).isActiv()){
				r0.add(r.get(i));
			}
		}
		return Response.ok(r0, MediaType.APPLICATION_JSON).build();
	}
	@PUT
	@Path("/izmeni")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response izmeniVozilo(Vozilo v) {	
	//	k.setDatumRegistracije(new Date(k.getDatumRegistracije()));
		System.out.println("tu sam i menjam Vozilo");
		izmeni(v);
		JsonSerializer.saveData();
		return Response.ok(v, MediaType.APPLICATION_JSON).build();
	}
	@DELETE
	@Path("/brisi/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response brisiVozilo(@PathParam("id") int id) {	
	//	k.setDatumRegistracije(new Date(k.getDatumRegistracije()));
		System.out.println("tu sam i brisem Vozilo");
		List<Vozilo> r = Data.getInstance().getVozila();
		for(int index=0; index<r.size(); index++){
			if(r.get(index).getId()==id){
				r.get(index).setActiv(false);
			}
		}
		JsonSerializer.saveData();
		return Response.ok(null, MediaType.APPLICATION_JSON).build();
	}

	private void izmeni(Vozilo v) {
		List<Vozilo> all = Data.getInstance().getVozila();
		for(int i=0; i<all.size(); i++){
			if(all.get(i).getId()==v.getId()){
				Data.getInstance().getVozila().set(i, v);
				return;
			}
		}
	}
}
