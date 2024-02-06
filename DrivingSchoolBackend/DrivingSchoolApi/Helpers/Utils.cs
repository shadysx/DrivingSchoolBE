using System.Diagnostics;

static public class Utils 
{
    static public async Task<string> DownloadAndSaveImage(string imageUrl, int id)
    {
        using (var httpClient = new HttpClient())
        {
            try
            {
                byte[] imageBytes = await httpClient.GetByteArrayAsync(imageUrl);
                
                // Choose a path to save the image locally
                string localImagePath = Path.Combine("C:","Images", "Questions", id.ToString() + ".jpg");

                // Save the image to the local folder
                await File.WriteAllBytesAsync(localImagePath, imageBytes);

                return $"http://213.213.230.92:5143/Images/{id}.jpg" ;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error downloading/saving image: {ex.Message}");
            }
        }
    }
}