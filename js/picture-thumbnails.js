import { openFullPictureModal } from './full-picture-modal';
import { renderFullPicture } from './render-full-picture';

const pictureTemplate = document.querySelector('#picture').content;
const newPictureTemplate = pictureTemplate.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');
const fragment = document.createDocumentFragment();

const clearPhoto = () => {
  picturesContainer.querySelectorAll('a.picture').forEach((item) => item.remove());
};

const onPhotoThumbnailsClick = (evt) => {
  const currentPictureTag = evt.target.closest('.picture');
  if (currentPictureTag) {
    evt.preventDefault();
    openFullPictureModal();
    const currentPictureID = currentPictureTag.dataset.photoID;
    renderFullPicture(currentPictureID);
  }
};

const renderThumbnails = (photos) => {
  clearPhoto();
  photos.forEach(({ id, url, description, likes, comments }) => {
    const element = newPictureTemplate.cloneNode(true);
    element.dataset.photoID = id;
    element.querySelector('.picture > img').src = url;
    element.querySelector('.picture > img').alt = description;
    element.querySelector('.picture__likes').textContent = likes;
    element.querySelector('.picture__comments').textContent = comments.length;
    fragment.appendChild(element);
    picturesContainer.appendChild(fragment);

    picturesContainer.addEventListener('click', onPhotoThumbnailsClick);
  });
};

export { renderThumbnails };
