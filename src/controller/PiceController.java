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
import bean.Pice;
import bean.Restoran;

@Path("/pice")
public class PiceController {
	@POST
	@Path("/dodaj")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response dodajPice(Pice j) {	
	//	k.setDatumRegistracije(new Date(k.getDatumRegistracije()));
		System.out.println("tu sam i kreiram Pice");
		j.setId(Data.getInstance().getPicaLength()+1);
		Data.getInstance().addPice(j);
		JsonSerializer.saveData();
		return Response.ok(j, MediaType.APPLICATION_JSON).build();
	}

	@PUT
	@Path("/izmeni")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response izmeniPice(Pice j) {	
	//	k.setDatumRegistracije(new Date(k.getDatumRegistracije()));
		System.out.println("tu sam i menjam Pice");
		izmeni(j);
		JsonSerializer.saveData();
		return Response.ok(j, MediaType.APPLICATION_JSON).build();
	}
	@DELETE
	@Path("/brisi/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response brisiPice(@PathParam("id") int id) {	
	//	k.setDatumRegistracije(new Date(k.getDatumRegistracije()));
		System.out.println("tu sam i brisem Pice");
		List<Restoran> r = Data.getInstance().getRestorani();
		for(Restoran r0 : r){
			for(int index=0; index<r0.getPica().size(); index++){
				if(r0.getPica().get(index).getId()==id){
					r0.getPica().get(index).setActiv(false);
					JsonSerializer.saveData();
					return Response.ok(MediaType.APPLICATION_JSON).build();
				}
			}
			
		}
		JsonSerializer.saveData();
		return Response.ok().build();
	}

	
	
	private void izmeni(Pice j) {
		List<Restoran> all = Data.getInstance().getRestorani();
		for(int i=0; i<all.size(); i++){
			if(all.get(i).getId()==j.getIdRestorana()){
				for(int k=0; k<all.get(i).getPica().size(); k++){
					if(all.get(i).getPica().get(k).getId()==j.getId()){
						Data.getInstance().getRestorani().get(i).getPica().set(k, j);
						return;
					}
				}
				
			}
		}
	}
}
