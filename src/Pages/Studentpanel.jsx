import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBriefcase,
  FaChevronDown,
  FaChevronRight,
  FaClipboardList,
  FaExternalLinkAlt,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaSignOutAlt,
  FaThLarge,
  FaTiktok,
  FaGraduationCap,
  FaUtensils,
} from "react-icons/fa";
import { loadJoinedEvents } from "../utils/joinedEvents";

const availableEvents = [
  {
    title: "Job Fair",
    route: "/jobfair",
    icon: FaBriefcase,
    tag: "Career",
    desc: "Find hiring booths, internship sessions, and recruiter meetups in one place.",
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1974&auto=format&fit=crop",
  },
  {
    title: "Food Events",
    route: "/foodevents",
    icon: FaUtensils,
    tag: "Lifestyle",
    desc: "Explore food stalls, tastings, restaurant launches, and brand activations.",
    img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1974&auto=format&fit=crop",
  },
  {
    title: "Educational Expo",
    route: "/educationalexpo",
    icon: FaGraduationCap,
    tag: "Learning",
    desc: "Browse institutes, scholarship programs, training booths, and admissions.",
    img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop",
  },
];

const previousEvents = [
  {
    id: 1,
    title: "Tech Innovators Job Fair",
    category: "Job Fair",
    date: "2026-05-10",
    time: "10:00 AM",
    venue: "Expo Hall A",
    attendees: 320,
    status: "Completed",
    reviews: [
      "Helpful recruiter sessions and clear internship guidance.",
      "Visitors liked the clean booth layout and event flow.",
    ],
  },
  {
    id: 2,
    title: "Campus Food Carnival",
    category: "Food Event",
    date: "2026-05-08",
    time: "5:00 PM",
    venue: "Central Lawn",
    attendees: 410,
    status: "Completed",
    reviews: ["Food stalls were well organised and easy to navigate."],
  },
  {
    id: 3,
    title: "Future Minds Expo",
    category: "Educational Expo",
    date: "2026-05-05",
    time: "11:30 AM",
    venue: "Seminar Hall",
    attendees: 290,
    status: "Completed",
    reviews: [
      "Educational booths and scholarship details were excellent.",
      "Smooth student registration experience.",
    ],
  },
];

const promotionPlans = [
  {
    name: "Basic Plan",
    price: "$30",
    posts: "7 Posts on Social Media",
    features: [
      "All starter features +",
      "Social media strategy",
      "Content Creation",
      "On Facebook, Instagram",
    ],
  },
  {
    name: "Standard Plan",
    price: "$40",
    posts: "12 Posts on Social Media",
    features: [
      "All starter features +",
      "Social media strategy",
      "Content Creation",
      "On Facebook, Instagram",
      "Additional TikTok",
    ],
    highlighted: true,
  },
  {
    name: "Premium Plan",
    price: "$50",
    posts: "15 Posts on Social Media",
    features: [
      "All starter features +",
      "Social media strategy",
      "Content Creation",
      "On Facebook, Instagram and TikTok",
      "Additional Linkedin Integration",
    ],
  },
];

const sidebarButton =
  "flex min-h-11 w-full items-center justify-between gap-3 bg-blue-800 px-3.5 py-2.5 text-left text-sm font-semibold text-white shadow-lg transition duration-300 hover:bg-blue-900";

const subButton =
  "flex min-h-11 w-full items-center justify-between gap-3 bg-blue-800 px-3.5 py-2.5 text-left text-sm font-semibold text-white shadow-lg transition duration-300 hover:bg-blue-900";

export const Studentpanel = () => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState("dashboard");
  const [recordOpen, setRecordOpen] = useState(false);
  const [joinedEvents, setJoinedEvents] = useState([]);
  const [reviewWindow, setReviewWindow] = useState(7);

  const pageTitle = useMemo(() => {
    if (activeView === "social") return "Social Media Promotion Plans";
    if (activeView === "records") return "";
    return "";
  }, [activeView]);

  const showDashboard = activeView === "dashboard";
  const showJoined = activeView === "joined";
  const showRecords = activeView === "records";

  useEffect(() => {
    const refreshJoinedEvents = () => {
      setJoinedEvents(loadJoinedEvents());
    };

    refreshJoinedEvents();

    window.addEventListener("storage", refreshJoinedEvents);
    window.addEventListener("vivent-joined-events-updated", refreshJoinedEvents);

    return () => {
      window.removeEventListener("storage", refreshJoinedEvents);
      window.removeEventListener("vivent-joined-events-updated", refreshJoinedEvents);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("viventAuth");
    localStorage.removeItem("viventAuthRole");
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <aside className="sidebar-font w-full bg-blue-800 text-white shadow-2xl lg:sticky lg:top-0 lg:h-screen lg:w-72 lg:min-w-72 lg:max-w-72 lg:self-stretch">
          <div className="flex h-full flex-col justify-between">
            <div>
              <div className="border-b border-blue-700 px-6 py-5">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-blue-100">
                  Student Dashboard
                </p>
              </div>

              <nav className="space-y-3 p-5">
                <button
                  className={sidebarButton}
                  onClick={() => {
                    setActiveView("dashboard");
                  }}
                  type="button"
                >
                  <span className="flex items-center gap-3">
                    <FaThLarge />
                    Dashboard
                  </span>
                </button>

                <div className="space-y-2">
                  <button
                    className={sidebarButton}
                    onClick={() => setActiveView("joined")}
                    type="button"
                  >
                    <span className="flex items-center gap-3">
                      <FaClipboardList />
                      Joined Events
                    </span>
                  </button>
                  <div className="space-y-2">
                    <button
                      className={subButton}
                      onClick={() => navigate("/jobfair")}
                      type="button"
                    >
                      Job Fair
                      <FaChevronRight className="text-xs" />
                    </button>
                    <button
                      className={subButton}
                      onClick={() => navigate("/foodevents")}
                      type="button"
                    >
                      Food Events
                      <FaChevronRight className="text-xs" />
                    </button>
                    <button
                      className={subButton}
                      onClick={() => navigate("/educationalexpo")}
                      type="button"
                    >
                      Educational Expo
                      <FaChevronRight className="text-xs" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    className={sidebarButton}
                    onClick={() => setRecordOpen((value) => !value)}
                    type="button"
                  >
                    <span className="flex items-center gap-3">
                      <FaClipboardList />
                      Records
                    </span>
                    <FaChevronDown
                      className={`transition ${recordOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {recordOpen && (
                    <div className="space-y-2 pl-3">
                      <button
                        className={subButton}
                        onClick={() => setActiveView("records")}
                        type="button"
                      >
                        Previous Events & Reviews
                        <FaChevronRight className="text-xs" />
                      </button>
                    </div>
                  )}
                </div>

                <button
                  className={sidebarButton}
                  onClick={() => setActiveView("social")}
                  type="button"
                >
                  <span className="flex items-center gap-3">
                    <FaInstagram />
                    Social Media Promotion
                  </span>
                </button>
              </nav>
            </div>

            <div className="border-t border-blue-700 p-5">
              <button
                className="flex w-full items-center justify-center gap-3 bg-blue-800 px-4 py-3 text-sm font-bold text-white shadow-xl transition duration-300 hover:bg-blue-900"
                onClick={handleLogout}
                type="button"
              >
                <FaSignOutAlt />
                Logout
              </button>
            </div>
          </div>
        </aside>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {pageTitle && (
            <section className="mb-7 rounded-2xl bg-white p-5 shadow-xl ring-1 ring-slate-200 sm:p-6">
              <h2 className="text-2xl font-black text-slate-900 sm:text-3xl">
                {pageTitle}
              </h2>
            </section>
          )}

          {activeView === "social" ? (
            <SocialPromotion />
          ) : showJoined ? (
            <JoinedEventsView joinedEvents={joinedEvents} />
          ) : (
            <div className="space-y-6">
              {showDashboard && <DashboardOverview />}
              {showRecords && (
                <RecordsView
                  reviewWindow={reviewWindow}
                  setReviewWindow={setReviewWindow}
                />
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

const JoinedEventsView = ({ joinedEvents }) => (
  <section className="rounded-2xl bg-white p-5 shadow-xl ring-1 ring-slate-200 sm:p-6">
    <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h3 className="text-xl font-black text-slate-900">Joined Events</h3>
        <p className="text-sm text-slate-500">
          Applications and ticketed joins from live event pages appear here.
        </p>
      </div>
      <span className="w-fit rounded-xl bg-blue-50 px-4 py-2.5 text-sm font-bold text-blue-800">
        {joinedEvents.length} joined
      </span>
    </div>

    {joinedEvents.length > 0 ? (
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {joinedEvents.map((item) => (
          <article
            className="flex h-full flex-col overflow-hidden rounded-2xl bg-slate-50 shadow-lg ring-1 ring-slate-200 transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
            key={item.eventKey || item.id}
          >
            <div className="flex h-2 w-full bg-blue-800" />
            <div className="flex flex-1 flex-col p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-blue-800/60">
                    {item.type || "Joined Event"}
                  </p>
                  <h4 className="mt-2 text-lg font-black text-slate-900">
                    {item.title}
                  </h4>
                  {item.company && (
                    <p className="mt-1 text-sm font-semibold text-blue-800">
                      {item.company}
                    </p>
                  )}
                </div>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
                  {item.status || "Joined"}
                </span>
              </div>

              <div className="mt-4 space-y-2 text-sm text-slate-600">
                {item.location && (
                  <p>
                    <span className="font-semibold text-slate-800">Venue:</span>{" "}
                    {item.location}
                  </p>
                )}
                {item.applicantName && (
                  <p>
                    <span className="font-semibold text-slate-800">Name:</span>{" "}
                    {item.applicantName}
                  </p>
                )}
                {item.email && (
                  <p>
                    <span className="font-semibold text-slate-800">Email:</span>{" "}
                    {item.email}
                  </p>
                )}
                {item.phone && (
                  <p>
                    <span className="font-semibold text-slate-800">Phone:</span>{" "}
                    {item.phone}
                  </p>
                )}
                {item.currentRole && (
                  <p>
                    <span className="font-semibold text-slate-800">Role:</span>{" "}
                    {item.currentRole}
                  </p>
                )}
                {item.ticketPrice && (
                  <p>
                    <span className="font-semibold text-slate-800">Ticket:</span>{" "}
                    PKR {Number(item.ticketPrice).toLocaleString()}
                  </p>
                )}
                <p>
                  <span className="font-semibold text-slate-800">Joined At:</span>{" "}
                  {item.submittedAt || item.joinedAt
                    ? new Date(item.submittedAt || item.joinedAt).toLocaleString()
                    : "Just now"}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    ) : (
      <div className="rounded-2xl bg-blue-50 p-5 text-sm font-semibold text-blue-800">
        No joined events yet. When a user applies or joins a live event, it will
        show here.
      </div>
    )}
  </section>
);

const DashboardOverview = () => (
  <section className="space-y-6">
    <AvailableEvents />
    <PreviousEventsTable
      title="Previous Events & Reviews"
      events={previousEvents}
    />
  </section>
);

const AvailableEvents = () => (
  <section className="rounded-2xl bg-white p-5 shadow-xl ring-1 ring-slate-200 sm:p-6">
    <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h3 className="text-xl font-black text-slate-900">
          Available Event Categories
        </h3>
        <p className="text-sm text-slate-500">
          Job fair, food events, and educational expo are listed below.
        </p>
      </div>
      <span className="w-fit rounded-xl bg-blue-50 px-4 py-2.5 text-sm font-bold text-blue-800">
        {availableEvents.length} live events
      </span>
    </div>

    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {availableEvents.map((event) => {
        const Icon = event.icon;

        return (
          <Link
            className="group flex h-full flex-col overflow-hidden rounded-2xl bg-slate-50 shadow-lg ring-1 ring-slate-200 transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
            key={event.title}
            to={event.route}
          >
            <div className="relative h-52 overflow-hidden">
              <img
                alt={event.title}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                src={event.img}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                <span className="rounded-lg bg-blue-800 px-3 py-2 text-xs font-bold">
                  {event.tag}
                </span>
                <Icon className="text-xl" />
              </div>
            </div>
            <div className="flex flex-1 flex-col p-4 text-center">
              <h4 className="text-xl font-black text-slate-900">
                {event.title}
              </h4>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                {event.desc}
              </p>
              <span className="mt-auto inline-flex items-center justify-center gap-2 self-center rounded-full bg-blue-800 px-4 py-2.5 text-sm font-bold text-white transition duration-300 group-hover:bg-blue-900">
                Open Page
                <FaExternalLinkAlt className="text-xs" />
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  </section>
);

const RecordsView = ({ reviewWindow, setReviewWindow }) => (
  <section className="space-y-6">
    <PreviousEventsTable
      title="Previous Events & Reviews"
      events={previousEvents}
      showOnlyRecent
      reviewWindow={reviewWindow}
      setReviewWindow={setReviewWindow}
      showFilter
    />
  </section>
);

const isWithinLast7Days = (dateValue) => {
  const date = new Date(`${dateValue}T00:00:00`);
  const now = new Date("2026-05-22T00:00:00");
  const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
  return diffDays >= 0 && diffDays <= 7;
};

const PreviousEventsTable = ({
  title,
  events,
  showOnlyRecent = false,
  reviewWindow,
  setReviewWindow,
  showFilter = false,
}) => {
  const rows = showOnlyRecent
    ? events.filter((event) => isWithinLast7Days(event.date))
    : events;

  return (
    <section className="rounded-2xl bg-white p-5 shadow-xl ring-1 ring-slate-200">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        {title && (
          <div>
            <h3 className="text-xl font-black text-slate-900">{title}</h3>
            <p className="text-sm text-slate-500">
              {showOnlyRecent
                ? "Seven day event records."
                : "Completed event records."}
            </p>
          </div>
        )}
        {showFilter && (
          <select
            className="w-full rounded-xl border border-blue-100 bg-blue-50 px-3 py-2 text-sm font-bold text-blue-800 outline-none sm:w-36"
            onChange={(event) => setReviewWindow(Number(event.target.value))}
            value={reviewWindow}
          >
            <option value={7}>7 days</option>
            <option value={15}>15 days</option>
            <option value={21}>21 days</option>
          </select>
        )}
      </div>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full min-w-[820px] border-separate border-spacing-y-2">
          <thead>
            <tr className="text-left text-[11px] uppercase tracking-[0.18em] text-blue-800">
              <th className="px-3 py-2">Event</th>
              <th className="px-3 py-2">Category</th>
              <th className="px-3 py-2">Date</th>
              <th className="px-3 py-2">Venue</th>
              <th className="px-3 py-2">Attendees</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Public Reviews</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((item) => (
              <tr className="bg-slate-50 shadow-sm" key={item.id}>
                <td className="rounded-l-2xl px-3 py-3.5 text-sm font-bold text-slate-900">
                  {item.title}
                </td>
                <td className="px-3 py-3.5 text-sm text-slate-700">
                  {item.category}
                </td>
                <td className="px-3 py-3.5 text-sm text-slate-700">
                  {item.date}
                </td>
                <td className="px-3 py-3.5 text-sm text-slate-700">
                  {item.venue}
                </td>
                <td className="px-3 py-3.5 text-sm text-slate-700">
                  {item.attendees}
                </td>
                <td className="px-3 py-3.5">
                  <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
                    {item.status}
                  </span>
                </td>
                <td className="rounded-r-2xl px-3 py-3.5">
                  <div className="space-y-2 text-xs leading-5 text-slate-600">
                    {item.reviews?.map((review) => (
                      <p
                        className="rounded-xl bg-white px-3 py-2 text-[11px] font-medium leading-5 text-slate-600"
                        key={review}
                      >
                        {review}
                      </p>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

const SocialPromotion = () => (
  <section className="space-y-6">
    <div className="grid gap-4 lg:grid-cols-3">
      {promotionPlans.map((plan) => (
        <article
          className={`flex h-full min-h-[380px] flex-col rounded-2xl bg-white p-4 shadow-xl ring-1 transition duration-300 hover:-translate-y-1 hover:shadow-2xl ${
            plan.highlighted ? "ring-blue-800" : "ring-slate-200"
          }`}
          key={plan.name}
        >
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-black text-slate-900">
                {plan.name}
              </h3>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-blue-800">
                {plan.posts}
              </p>
            </div>
            {plan.highlighted && (
              <span className="rounded-lg bg-blue-800 px-2.5 py-1.5 text-[11px] font-black text-white">
                Popular
              </span>
            )}
          </div>

          <p className="mb-4 text-3xl font-black text-blue-800">
            {plan.price}
            <span className="text-sm font-bold text-slate-500"> / month</span>
          </p>

          <ul className="space-y-2.5 text-xs leading-5 text-slate-600">
            {plan.features.map((feature) => (
              <li className="flex gap-3" key={feature}>
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-800" />
                {feature}
              </li>
            ))}
          </ul>

          <button
            className="mt-5 w-full rounded-xl bg-blue-800 px-4 py-3 text-sm font-bold text-white shadow-lg transition duration-300 hover:bg-blue-900"
            type="button"
          >
            Select Plan
          </button>
        </article>
      ))}
    </div>
  </section>
);

export default Studentpanel;
