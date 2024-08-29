import {id} from "date-fns/locale";
import supabase, {supabaseUrl} from "./supabase";

export async function getCabins() {

    const {data, error} = await supabase
        .from('cabins')
        .select('*')

    if (error) {
        console.error(error)
        throw new Error('cabins could not load')
    }

    return data;

}

export async function CreateEditCabin(newCabin,id) {
    const hasImagePath = newCabin.image
        ?.startsWith?.(supabaseUrl)

    const imageName = `${Math.random()}-${newCabin
        .image
        .name}`
        .replaceAll("/", "");
    const imagePath = hasImagePath
        ? newCabin.image
        : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
    //create/edit a cabin
    let query = supabase.from('cabins');
    //create a cabin
    if (!id) 
        query = query.insert([
            {
                ...newCabin,
                image: imagePath
            }
        ]).select();
    
    // edit a cabin
    if (id) 
        query = query.update({
            ...newCabin,
            image: imagePath
        }).eq("id", id).select()

    const {data, error} = await query
        .select()
        .single()

    if (error) {
        console.error(error)
        throw new Error('cabin could not be created')
    }
   if (hasImagePath) return data;

   // upload image
    const {error: storageError} = await supabase
        .storage
        .from('cabin-images')
        .upload(imageName, newCabin.image)

    if (storageError) {
        await supabase
            .from('cabin')
            .delete()
            .eq('id', data.id)
        throw new Error('image failed to upload and cabin failed to be created')
    }

    return data;
}

export async function deleteCabins(id) {

    const {data, error} = await supabase
        .from('cabins')
        .delete()
        .eq('id', id)

    if (error) {
        console.error(error)
        throw new Error('cabins could not be deleted')
    }

    return data;

}