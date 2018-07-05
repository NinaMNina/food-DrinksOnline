package controller;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import jsonData.Data;
import jsonData.JsonSerializer;
import bean.Jelo;
import bean.Restoran;

@Path("/jelo")
public class JeloController {
	@POST
	@Path("/dodaj")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response dodajJelo(Jelo j) {	
	//	k.setDatumRegistracije(new Date(k.getDatumRegistracije()));
		System.out.println("tu sam i kreiram jelo");
		j.setId(Data.getInstance().getJelaLength()+1);
		Data.getInstance().addJelo(j);
		JsonSerializer.saveData();
		return Response.ok(j, MediaType.APPLICATION_JSON).build();
	}

	@PUT
	@Path("/izmeni")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response izmeniJelo(Jelo j) {	
	//	k.setDatumRegistracije(new Date(k.getDatumRegistracije()));
		System.out.println("tu sam i menjam jelo");
		izmeni(j);
		JsonSerializer.saveData();
		return Response.ok(j, MediaType.APPLICATION_JSON).build();
	}
	@DELETE
	@Path("/brisi/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response brisiJelo(@PathParam("id") int id) {	
	//	k.setDatumRegistracije(new Date(k.getDatumRegistracije()));
		System.out.println("tu sam i brisem jelo");
		List<Restoran> r = Data.getInstance().getRestorani();
		for(Restoran r0 : r){
			for(int index=0; index<r0.getJela().size(); index++){
				if(r0.getJela().get(index).getId()==id){
					r0.getJela().get(index).setActiv(false);
					JsonSerializer.saveData();
					return Response.ok(MediaType.APPLICATION_JSON).build();
				}
			}
			
		}
		JsonSerializer.saveData();
		return Response.ok().build();
	}

	
	
	private void izmeni(Jelo j) {
		List<Restoran> all = Data.getInstance().getRestorani();
		for(int i=0; i<all.size(); i++){
			if(all.get(i).getId()==j.getIdRestorana()){
				for(int k=0; k<all.get(i).getJela().size(); k++){
					if(all.get(i).getJela().get(k).getId()==j.getId()){
						Data.getInstance().getRestorani().get(i).getJela().set(k, j);
						return;
					}
				}
				
			}
		}
	}
}
