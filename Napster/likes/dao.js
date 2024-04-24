import userModel from "../../Kanbas/users/model.js";
import albumModel from "../albums/model.js";

// It could be that you are the first person who has liked the album, which means it does not exist in the database.
export const userLikesAlbum = async (userId, album) => {
    const user = await userModel.findById(userId);
    let actualAlbum = await albumModel.findOne({ albumId: album.albumId });
    // First create it and then manipulate it.
    if (!actualAlbum) {
        actualAlbum = await albumModel.create(album);
    }
    user.likesAlbums.push(actualAlbum._id);
    actualAlbum.likedBy.push(user._id);
    await user.save();
    await actualAlbum.save();
};	

// Assume that the album has been liked. You can only unlike an album that has been liked.
// Could do some error checking with a try/catch block.
export const userUnlikesAlbum = async (userId, albumId) => {
    const user = await userModel.findById(userId);
    const album = await albumModel.findOne({ albumId });
    // Filter out the album you are unliking.
    user.likesAlbums = user.likesAlbums.filter((id) => id !== album._id);
    // Filter out the user since they no longer like the album.
    album.likedBy = album.likedBy.filter((id) => id !== user._id);
    await user.save();
    await album.save();
};	