// === List of Allowed Formats ===
// add new formats in these lists
const imageFormatsList = ['.png', '.jpg'];

export const imageFormats = () =>
    imageFormatsList
        .map(format => `image/${format.slice(1, format.length)}`)
        .reduce((str, current) => `${str}, ${current}`);

export function isImage(fileType: string) {
    let formatList = imageFormatsList.map(
        item => 'image/' + item.slice(1, item.length)
    );
    // console.log(formatList);
    if (formatList.includes(fileType)) return true;
    else return false;
}

export const getYoutubeEmbedUrl = (url: string): string => {
    if (!url) return '';

    // Handle youtu.be short URLs
    if (url.includes('youtu.be')) {
        const videoId = url.split('youtu.be/')[1].split('?')[0];
        return `https://www.youtube.com/embed/${videoId}`;
    }

    // Handle standard youtube.com URLs
    if (url.includes('youtube.com')) {
        const videoId = new URL(url).searchParams.get('v');
        return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
    }

    return url;
};
