import React, { useState, useEffect, memo, useCallback, useRef } from "react";
import {
  getDocs,
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  or,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase/firestore";
import {
  MessageCircle,
  UserCircle2,
  Loader2,
  AlertCircle,
  Send,
  ImagePlus,
  X,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const Comments = memo(({ comment, formatDate, index }) => (
  <div className="px-4 pt-4 pb-2 rounded-xl bg-black/5 border border-white/10 hover:bg-white/10 transition-all group hover:shadow-lg hover:-translate-y-0.5">
    <div className="flex items-center gap-3">
      {comment.profileImage ? (
        <img
          src={comment.profileImage}
          alt={`Profile image of ${comment.name}`}
          className="w-10 h-10 rounded-full object-cover"
          loading="lazy"
        />
      ) : (
        <div className="p-2 rounded-full bg-indigo-500/20 text-indigo-400 group-hover:bg-indigo-500/30 transition-colors">
          <UserCircle2 className="w-5 h-5 " />
        </div>
      )}
      <div className="grow min-w-0">
        <div className="flex items-center justify-between gap-4 mb-2">
          <h4 className="font-medium text-black truncate">
            {comment.userName}
          </h4>
          <span className="text-xs text-gray-600">
            {formatDate(comment.createdAt)}
          </span>
        </div>
        <p className="text-gray-600 text-sm break-words leading-relaxed relative bottom-2">
          {comment.content}
        </p>
      </div>
    </div>
  </div>
));

const CommentForm = memo(({ onSubmit, isSubmitting, error }) => {
  const [newComment, setNewComment] = useState("");
  const [userName, setUserName] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleImageChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImageFile(null);
      setImagePreview(null);
    }
  }, []);

  const handleTextareChange = useCallback((e) => {
    setNewComment(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, []);

  const handleSummit = useCallback(
    (e) => {
      e.preventDefault();
      if (newComment.trim() === "" || userName.trim() === "") return;
      onSubmit({ newComment, userName, imageFile });
      setNewComment("");
      setImageFile(null);
      setImagePreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    },
    [newComment, userName, imageFile, onSubmit]
  );

  return (
    <form onSubmit={handleSummit} className="space-y-6">
      {/* ///input name */}
      <div className="space-y-2" data-aos="fade-up" data-aos-duration="1000">
        <label className="block text-sm font-medium text-black">
          Name <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Enter your name"
          className="w-full p-3 bg-black/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
          required
        />
      </div>
      {/* ///input message */}
      <div className="space-y-2" data-aos="fade-up" data-aos-duration="1200">
        <label className="block text-sm font-medium text-black">
          Message <span className="text-red-400">*</span>
        </label>
        <textarea
          ref={textareaRef}
          value={newComment}
          onChange={handleTextareChange}
          placeholder="Write your massage here..."
          className="w-full p-4 rounded-xl bg-black/5 border border-white/10 text-black placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none min-h-[120px]"
          required
        />
      </div>

      {/* ///input image */}
      <div className="space-y-2" data-aos="fade-up" data-aos-duration="1400">
        <label className="block text-sm font-medium text-black">
          Profile Photo <span className="text-gray-400">(optional)</span>
        </label>
        <div className="flex items-center gap-4 p-4 bg-black/5 border border-white/10 rounded-xl">
          {imagePreview ? (
            <div className="flex items-center gap-4">
              <img
                src={imagePreview}
                alt="Profile preview"
                className="w-16 h-16 rounded-full object-cover border-2 border-indigo-500/50"
              />
              <button
                type="button"
                onClick={() => {
                  setImagePreview(null);
                  setImageFile(null);
                  if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                  }
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all group"
              >
                <X className="w-4 h-4" />
                <span>Remote Photo</span>
              </button>
            </div>
          ) : (
            <div className="w-full">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30 transition-all border border-dashed border-indigo-500/30 hover:border-indigo-500 group"
              >
                <ImagePlus className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Choose Profile Photo</span>
              </button>
              <p className="text-center text-gray-400 text-sm mt-2">
                Max file size: 5MB
              </p>
            </div>
          )}
        </div>
      </div>
      {/* ///submit button */}
      <button
        type="submit"
        disabled={isSubmitting}
        data-aos="fade-up"
        data-aos-duration="1000"
        className="relative w-full h-12 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-xl font-medium text-white overflow-hidden group transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
      >
        <div className="absolute inset-0 bg-white/20 translate-y-12 group-hover:translate-y-0 transition-transform duration-300" />
        <div className="relative flex items-center justify-center gap-2">
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Posting...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Post Comment</span>
            </>
          )}
        </div>
      </button>
    </form>
  );
});

const CommentSection = () => {
  const [comments, setComments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      once: false,
      duration: 1000,
    });
  }, []);

  useEffect(() => {
    const commentsRef = collection(db, "portfolio-comments");
    const q = query(commentsRef, orderBy("createdAt", "desc"));

    return onSnapshot(q, (querySnapshot) => {
      const commentsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(commentsData);
    });
  }, []);

  const uploadImage = useCallback(async (imageFile) => {
    if (!imageFile) return null;
    const storageRef = ref(
      storage,
      `profile-images/${Date.now()}_${imageFile.name}`
    );
    await uploadBytes(storageRef, imageFile);
    return getDownloadURL(storageRef);
  }, []);

  const handleCommentSubmit = useCallback(
    async ({ newComment, userName, imageFile }) => {
      setError("");
      setIsSubmitting(true);

      try {
        const profileImageUrl = await uploadImage(imageFile);
        await addDoc(collection(db, "portfolio-comments"), {
          content: newComment,
          userName,
          profileImage: profileImageUrl,
          createdAt: serverTimestamp(),
        });
      } catch (error) {
        setError("Failed to post comment. Please try again.");
        console.error("Error adding comment: ", error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [uploadImage]
  );

  const formatDate = useCallback((timestamp) => {
    if (!timestamp) return "";
    const date = timestamp.toDate();
    const now = new Date();
    const diffMinutes = Math.floor((now - date) / (1000 * 60));
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMinutes < 1) return "Just now";
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  }, []);

  return (
    <div
      className="w-full bg-gradient-to-b from-white/10 to-white/5 rounded-2xl overflow-hidden backdrop-blur-xl shadow-xl "
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      <div
        className="p-6 border-b border-white/10"
        data-aos="fade-down"
        data-aos-duration="800"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-indigo-500/20">
            <MessageCircle className="w-6 h-6 text-indigo-400" />
          </div>
          <h3 className="text-xl font-semibold text-black">
            comments{" "}
            <span className="text-indigo-400">({comments.length})</span>
          </h3>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {error && (
          <div
            className="flex items-center gap-2 p-4 text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl"
            data-aos="fade-up"
          >
            <AlertCircle className="w-5 h-5" />
            <span className="text-sm">{error}</span>
          </div>
        )}
        <div>
          <CommentForm
            onSubmit={handleCommentSubmit}
            isSubmitting={isSubmitting}
            error={error}
          />
        </div>
        <div
          className="space-y-4 h-[300px] overflow-y-auto custom-scrollbar"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {comments.length === 0 ? (
            <div className="text-center py-8 " data-aos="fade-right">
              <UserCircle2 className="w-12 h-12 text-indigo-400 mx-auto mb-3 opacity-50" />
              <p className=" text-gray-600">No comments yet</p>
            </div>
          ) : (
            comments.map((comment, index) => (
              <Comments
                key={comment.id}
                comment={comment}
                formatDate={formatDate}
                index={index}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
