package controller;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import jsonData.Data;
import jsonData.JsonSerializer;
import bean.Restoran;

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
	@Path("/svi")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response sviRestorani() {	
	//	k.setDatumRegistracije(new Date(k.getDatumRegistracije()));
		System.out.println("tu sam i dobavnljam restorane");
		List<Restoran> r = Data.getInstance().getRestorani();
		JsonSerializer.saveData();
		return Response.ok(r, MediaType.APPLICATION_JSON).build();
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
