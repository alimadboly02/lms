import React, { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  SkipBack,
  SkipForward,
  Music,
} from "lucide-react";

interface AudioPlayerProps {
  audioUrl: string;
  title: string;
  thumbnailUrl?: string;
}

export function AudioPlayer({
  audioUrl,
  title,
  thumbnailUrl,
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    if (newVolume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;

    if (isMuted) {
      audioRef.current.volume = volume;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  const skip = (seconds: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime += seconds;
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="bg-white rounded-[5px] shadow-lg overflow-hidden">
      <audio ref={audioRef} src={audioUrl} />

      {/* Header with Thumbnail */}
      <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-4 w-32 h-32 border-2 border-white/30 rounded-full"></div>
          <div className="absolute bottom-8 left-8 w-24 h-24 border-2 border-white/20 rounded-full"></div>
          <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-white/10 rounded-full"></div>
        </div>

        <div className="flex items-center gap-6 relative z-10">
          <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-[5px] flex items-center justify-center flex-shrink-0 border-2 border-white/30">
            {thumbnailUrl ? (
              <img
                src={thumbnailUrl}
                alt={title}
                className="w-full h-full object-cover rounded-[5px]"
              />
            ) : (
              <Music className="w-12 h-12 text-white" />
            )}
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-1">{title}</h2>
            <p className="text-emerald-100 text-sm">التسجيل الصوتي</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="p-6">
        {/* Progress Bar */}
        <div className="mb-4">
          <input
            dir="ltr"
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer
                     [&::-webkit-slider-thumb]:appearance-none
                     [&::-webkit-slider-thumb]:w-4
                     [&::-webkit-slider-thumb]:h-4
                     [&::-webkit-slider-thumb]:bg-emerald-500
                     [&::-webkit-slider-thumb]:rounded-full
                     [&::-webkit-slider-thumb]:cursor-pointer
                     [&::-webkit-slider-thumb]:shadow-lg
                     [&::-moz-range-thumb]:w-4
                     [&::-moz-range-thumb]:h-4
                     [&::-moz-range-thumb]:bg-emerald-500
                     [&::-moz-range-thumb]:rounded-full
                     [&::-moz-range-thumb]:border-0
                     [&::-moz-range-thumb]:cursor-pointer"
            style={{
              background: `linear-gradient(to right, #10b981 0%, #10b981 ${(currentTime / duration) * 100}%, #e5e7eb ${(currentTime / duration) * 100}%, #e5e7eb 100%)`,
            }}
          />
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>{formatTime(duration)}</span>
            <span>{formatTime(currentTime)}</span>
          </div>
        </div>

        {/* Play Controls */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => skip(-10)}
            className="p-3 rounded-full hover:bg-gray-100 transition-colors"
          >
            <SkipBack className="w-5 h-5 text-gray-700" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={togglePlay}
            className="p-5 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 transition-all shadow-lg relative overflow-hidden"
          >
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-1 -right-1 w-8 h-8 border border-white/20 rounded-full"></div>
              <div className="absolute bottom-2 left-2 w-6 h-6 border border-white/15 rounded-full"></div>
            </div>
            {isPlaying ? (
              <Pause className="w-7 h-7 relative z-10" />
            ) : (
              <Play className="w-7 h-7 relative z-10" />
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => skip(10)}
            className="p-3 rounded-full hover:bg-gray-100 transition-colors"
          >
            <SkipForward className="w-5 h-5 text-gray-700" />
          </motion.button>
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-[5px]">
          <button
            onClick={toggleMute}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5 text-gray-600" />
            ) : (
              <Volume2 className="w-5 h-5 text-gray-600" />
            )}
          </button>

          <input
            dir="ltr"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="flex-1 h-2 rounded-full appearance-none cursor-pointer
           [&::-webkit-slider-thumb]:appearance-none
           [&::-webkit-slider-thumb]:w-3
           [&::-webkit-slider-thumb]:h-3
           [&::-webkit-slider-thumb]:bg-emerald-500
           [&::-webkit-slider-thumb]:rounded-full
           [&::-webkit-slider-thumb]:cursor-pointer
           [&::-moz-range-thumb]:w-3
           [&::-moz-range-thumb]:h-3
           [&::-moz-range-thumb]:bg-emerald-500
           [&::-moz-range-thumb]:rounded-full
           [&::-moz-range-thumb]:border-0"
            style={{
              background: `linear-gradient(to right, #10b981 0%, #10b981 ${(isMuted ? 0 : volume) * 100}%, #e5e7eb ${(isMuted ? 0 : volume) * 100}%, #e5e7eb 100%)`,
            }}
          />

          <span className="text-sm text-gray-600 w-12 text-center">
            {Math.round((isMuted ? 0 : volume) * 100)}%
          </span>
        </div>
      </div>
    </div>
  );
}
