"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
} from "framer-motion";
import {
  useEffect,
  useRef,
  useState,
} from "react";

import "./team.css";

const revealEase = [0.16, 1, 0.3, 1];

const teamMembers = [
  {
    id: 1,
    name: "Shanmugasundaram Muthaiyah",
    role: "CEO",
    department: "Leadership",
    image: "/images/team/team-member-01.jpg",
    experience: "25+ years",
    bio: "As Chief Executive Officer, Shanmugasundaram Muthaiyah leads the studio’s vision, growth, and strategic direction across film, episodic, and digital content. His expertise spans VFX supervision, pipeline development, technology, talent development, and information security.",
    skills: [
      "Studio Leadership",
      "VFX Supervision",
      "Pipeline Development",
      "Strategy",
    ],
  },
  {
    id: 2,
    name: "Gurubharran Dhakchinamoorthy",
    role: "Global Executive Producer",
    department: "Production",
    image: "/images/team/team-member-02.jpg",
    experience: "Global production leadership",
    bio: "Gurubharran oversees large-scale visual effects productions from concept through delivery. He brings together international creative and technical teams while ensuring production quality, operational efficiency, client alignment, and reliable delivery.",
    skills: [
      "Executive Production",
      "Global Workflows",
      "Client Partnerships",
      "Production Strategy",
    ],
  },
  {
    id: 3,
    name: "Kesavan Subramaniyan",
    role: "Head of Studio",
    department: "Studio Operations",
    image: "/images/team/team-member-03.jpg",
    experience: "24+ years",
    bio: "Kesavan oversees studio operations, production execution, capacity planning, and delivery performance. His leadership connects production, technology, and creative departments to maintain efficient workflows and consistent quality.",
    skills: [
      "Studio Operations",
      "Capacity Planning",
      "Resource Management",
      "Process Optimization",
    ],
  },
  {
    id: 4,
    name: "Bibinsuresh R",
    role: "Head of IT",
    department: "Technology",
    image: "/images/team/team-member-04.jpg",
    experience: "13+ years",
    bio: "Bibinsuresh leads technology infrastructure, production IT operations, and information security governance. He maintains secure, reliable, and scalable studio environments that support demanding global VFX production.",
    skills: [
      "IT Operations",
      "Information Security",
      "Infrastructure",
      "TPN Workflows",
    ],
  },
  {
    id: 5,
    name: "Sujitha B",
    role: "Head of Production",
    department: "Production",
    image: "/images/team/team-member-05.jpg",
    experience: "13+ years",
    bio: "Sujitha leads end-to-end production strategy across film, episodic, and digital projects. Her focus on planning, resource management, risk control, and communication helps teams deliver high-quality results on schedule.",
    skills: [
      "Production Strategy",
      "Resource Planning",
      "Risk Management",
      "Team Leadership",
    ],
  },
  {
    id: 6,
    name: "Ajithkumar K",
    role: "Production Manager",
    department: "Production",
    image: "/images/team/team-member-06.jpg",
    experience: "5+ years",
    bio: "Ajithkumar manages end-to-end production workflows with a focus on scheduling, resource planning, and cross-department coordination. His proactive approach helps maintain smooth pipelines and dependable project delivery.",
    skills: [
      "Scheduling",
      "Production Management",
      "Resource Planning",
      "Coordination",
    ],
  },
  {
    id: 7,
    name: "Manojkumar E",
    role:
      "Head of Department – Match-move / Rotomation",
    department: "Matchmove",
    image: "/images/team/team-member-07.jpg",
    experience: "17+ years",
    bio: "Manojkumar leads Matchmove and Rotomation, overseeing camera tracking, object tracking, character rotomation, shot methodology, and quality control. His technical leadership supports reliable integration across layout, animation, FX, and compositing.",
    skills: [
      "Camera Tracking",
      "Object Tracking",
      "Rotomation",
      "Quality Control",
    ],
  },
  {
    id: 8,
    name: "Muneeswaran S",
    role: "Head of Department – Paint & Prep",
    department: "Paint & Prep",
    image: "/images/team/team-member-08.jpg",
    experience: "16+ years",
    bio: "Muneeswaran leads Paint & Prep across complex feature and episodic productions. His expertise includes advanced paint, roto-prep, wire removal, rig cleanup, and plate restoration, supported by strong quality and workflow leadership.",
    skills: [
      "Paint",
      "Roto-prep",
      "Rig Removal",
      "Plate Restoration",
    ],
  },
  {
    id: 9,
    name: "Anandh V",
    role: "Head of Department – Roto",
    department: "Rotoscopy",
    image: "/images/team/team-member-09.jpg",
    experience: "6+ years",
    bio: "Anandh leads roto workflows, shot execution, and quality control. With expertise in Silhouette, Nuke, Mocha Pro, and After Effects, he ensures precise outputs that support seamless downstream compositing.",
    skills: [
      "Rotoscopy",
      "Silhouette",
      "Nuke",
      "Mocha Pro",
    ],
  },
  {
    id: 10,
    name: "Rajasekar S",
    role: "Line Producer",
    department: "Production",
    image: "/images/team/team-member-10.jpg",
    experience: "5+ years",
    bio: "Rajasekar supports end-to-end production by managing schedules, budgets, priorities, and cross-department communication. His structured and client-focused approach helps maintain transparent and reliable delivery.",
    skills: [
      "Line Production",
      "Budget Tracking",
      "Scheduling",
      "Client Communication",
    ],
  },
  {
    id: 11,
    name: "Deepika R",
    role: "Line Producer",
    department: "Production",
    image: "/images/team/team-member-11.jpg",
    experience: "3+ years",
    bio: "Deepika brings an energetic and proactive approach to project coordination. She supports scheduling, task tracking, daily production operations, and clear communication between leadership, artists, and clients.",
    skills: [
      "Project Coordination",
      "Task Tracking",
      "Scheduling",
      "Production Support",
    ],
  },
  {
    id: 12,
    name: "Manikandaprabhu P",
    role: "Paint & Prep Supervisor",
    department: "Paint & Prep",
    image: "/images/team/team-member-12.jpg",
    experience: "12+ years",
    bio: "Manikandaprabhu supervises advanced paint, roto-prep, wire and rig removal, marker cleanup, and plate restoration. He maintains technical consistency and quality across demanding, high-volume productions.",
    skills: [
      "Paint Supervision",
      "Roto-prep",
      "Cleanup",
      "Quality Control",
    ],
  },
  {
    id: 13,
    name: "Jayakannan S",
    role: "Paint & Prep Supervisor",
    department: "Paint & Prep",
    image: "/images/team/team-member-13.jpg",
    experience: "9+ years",
    bio: "Jayakannan supervises high-quality paint and preparation work for major feature and episodic productions. His precision and technical expertise help teams deliver clean, seamless, production-ready imagery.",
    skills: [
      "Paint Supervision",
      "Wire Removal",
      "Rig Cleanup",
      "Plate Restoration",
    ],
  },
  {
    id: 14,
    name: "Sathish",
    role: "Roto Supervisor",
    department: "Rotoscopy",
    image: "/images/team/team-member-14.jpg",
    experience: "9+ years",
    bio: "Sathish is known for technical precision and consistency across complex VFX shots. He guides roto teams, maintains quality standards, and delivers efficient solutions for demanding compositing requirements.",
    skills: [
      "Roto Supervision",
      "Silhouette",
      "Mocha Pro",
      "After Effects",
    ],
  },
  {
    id: 15,
    name: "Siva M",
    role: "Roto Supervisor",
    department: "Rotoscopy",
    image: "/images/team/team-member-15.jpg",
    experience: "8+ years",
    bio: "Siva brings a detail-driven and collaborative approach to rotoscoping for feature and episodic content. He focuses on refined mattes, visual continuity, production efficiency, and dependable delivery.",
    skills: [
      "Roto Supervision",
      "Silhouette",
      "Nuke",
      "Mocha Pro",
    ],
  },
  {
    id: 16,
    name: "Kesavan S",
    role: "Comp Supervisor",
    department: "Compositing",
    image: "/images/team/team-member-16.jpg",
    experience: "5+ years",
    bio: "Kesavan shapes the final visual language of VFX shots by balancing technical execution with creative intent. He leads shot finishing, colour integration, light matching, troubleshooting, and final polish.",
    skills: [
      "Compositing",
      "Nuke",
      "Light Matching",
      "Shot Finishing",
    ],
  },
  {
    id: 17,
    name: "Rajapandi M",
    role: "Team Lead – Paint & Prep",
    department: "Paint & Prep",
    image: "/images/team/team-member-17.jpg",
    experience: "5+ years",
    bio: "Rajapandi leads production-ready paint and cleanup for feature and episodic projects. His calm, process-driven approach helps artists maintain quality across heavy shot volumes and demanding schedules.",
    skills: [
      "Paint",
      "Nuke",
      "Silhouette Paint",
      "Shot Review",
    ],
  },
  {
    id: 18,
    name: "Ponselvam N",
    role: "Team Lead – Paint & Prep",
    department: "Paint & Prep",
    image: "/images/team/team-member-18.jpg",
    experience: "5+ years",
    bio: "Ponselvam specializes in complex paint work, wire removal, rig cleanup, and detailed frame-by-frame fixes. His technical problem-solving and mentoring support clean downstream integration.",
    skills: [
      "Complex Cleanup",
      "Wire Removal",
      "Nuke",
      "Silhouette Paint",
    ],
  },
  {
    id: 19,
    name: "Vemban P",
    role: "Team Lead – Paint & Prep",
    department: "Paint & Prep",
    image: "/images/team/team-member-19.jpg",
    experience: "5+ years",
    bio: "Vemban focuses on efficient paint workflows, shot distribution, progress monitoring, and reliable delivery. He connects supervisors and artists while maintaining quality across multiple projects.",
    skills: [
      "Paint Leadership",
      "Shot Planning",
      "Quality Checks",
      "Team Coordination",
    ],
  },
  {
    id: 20,
    name: "Leeladevi R",
    role: "Team Lead – Roto",
    department: "Rotoscopy",
    image: "/images/team/team-member-20.jpg",
    experience: "5+ years",
    bio: "Leeladevi delivers clean and accurate rotoscoping for film and episodic content. Her attention to detail, reliability, and quality-driven approach support smooth workflows and dependable delivery.",
    skills: [
      "Roto Leadership",
      "Silhouette",
      "Nuke",
      "Quality Control",
    ],
  },
  {
    id: 21,
    name: "Muthuram S",
    role: "Team Lead – Roto",
    department: "Rotoscopy",
    image: "/images/team/team-member-21.jpg",
    experience: "5+ years",
    bio: "Muthuram specializes in clean and accurate rotoscoping across complex, high-volume productions. His calm execution and consistent quality help teams meet demanding schedules.",
    skills: [
      "Roto Leadership",
      "Silhouette",
      "Nuke",
      "Mocha Pro",
    ],
  },
  {
    id: 22,
    name: "Sankar V",
    role: "Team Lead – Roto",
    department: "Rotoscopy",
    image: "/images/team/team-member-22.jpg",
    experience: "5+ years",
    bio: "Sankar manages daily roto tasks, supports artists through challenging shots, and coordinates deliveries with compositing and production teams. His organized approach contributes to consistent quality.",
    skills: [
      "Team Coordination",
      "Rotoscopy",
      "Silhouette",
      "Mocha Pro",
    ],
  },
  {
    id: 23,
    name: "Bhuvaneeswari P",
    role: "Team Lead – Roto",
    department: "Rotoscopy",
    image: "/images/team/team-member-23.jpg",
    experience: "5+ years",
    bio: "Bhuvaneeswari manages day-to-day roto work through structured workflows and clear artist guidance. Her adaptability and collaborative approach support quality and on-time delivery.",
    skills: [
      "Roto Leadership",
      "Artist Guidance",
      "Silhouette",
      "Nuke",
    ],
  },
  {
    id: 24,
    name: "Barath Balaji",
    role: "Team Lead – Matchmove",
    department: "Matchmove",
    image: "/images/team/team-member-24.jpg",
    experience: "6+ years",
    bio: "Barath specializes in camera tracking, object tracking, and scene reconstruction. His precision, spatial awareness, and technical problem-solving provide a reliable foundation for complex VFX integration.",
    skills: [
      "Matchmove",
      "Camera Tracking",
      "Object Tracking",
      "Scene Reconstruction",
    ],
  },
  {
    id: 25,
    name: "Ganapathi S",
    role: "Associate Head of IT",
    department: "Technology",
    image: "/images/team/team-member-25.jpg",
    experience: "13+ years",
    bio: "Ganapathi supports secure and scalable technology operations across demanding VFX pipelines. His expertise covers production infrastructure, cloud workflows, information security, and system reliability.",
    skills: [
      "IT Infrastructure",
      "Cloud Workflows",
      "Security",
      "System Reliability",
    ],
  },
  {
    id: 26,
    name: "Babu Rathinam M",
    role: "Associate Production Manager",
    department: "Production",
    image: "/images/team/team-member-26.jpg",
    experience: "5+ years",
    bio: "Babu supports film and episodic production through progress tracking, priority management, schedule transparency, and clear client communication. His structured approach supports reliable delivery.",
    skills: [
      "Production Management",
      "Client Communication",
      "Progress Tracking",
      "Coordination",
    ],
  },
  {
    id: 27,
    name: "Prakash S",
    role: "Team Lead – IT",
    department: "Technology",
    image: "/images/team/team-member-27.jpg",
    experience: "4+ years",
    bio: "Prakash supports day-to-day technology operations, system reliability, artist workstations, servers, and secure access. His responsive approach helps minimize downtime across production.",
    skills: [
      "Technical Support",
      "Infrastructure",
      "System Maintenance",
      "Production IT",
    ],
  },
  {
    id: 28,
    name: "Siva M",
    role: "Team Lead – External Data",
    department: "Data Operations",
    image: "/images/team/team-member-28.jpg",
    experience: "5+ years",
    bio: "Siva manages secure inbound and outbound data workflows between clients, vendors, and internal teams. His focus on data integrity, version control, and coordination supports uninterrupted production.",
    skills: [
      "External Data",
      "Data Integrity",
      "Version Control",
      "Secure Transfer",
    ],
  },
  {
    id: 29,
    name: "Yogeshwaran A",
    role: "Team Lead – Internal Data",
    department: "Data Operations",
    image: "/images/team/team-member-29.jpg",
    experience: "4+ years",
    bio: "Yogeshwaran manages internal production data, storage structures, accessibility, and version consistency. His process-driven approach supports stable pipelines and efficient asset handling.",
    skills: [
      "Internal Data",
      "Asset Management",
      "Version Control",
      "Workflow Support",
    ],
  },
  {
    id: 30,
    name: "Deebarani R",
    role: "Human Resource",
    department: "People & Culture",
    image: "/images/team/team-member-30.jpg",
    experience: "12+ years",
    bio: "Deebarani supports talent management, recruitment, employee engagement, performance management, and organizational development. Her people-first approach contributes to a strong workplace culture.",
    skills: [
      "Human Resources",
      "Recruitment",
      "Employee Engagement",
      "Talent Development",
    ],
  },
  {
    id: 31,
    name: "Selvi M",
    role: "HR / Facility Manager",
    department: "People & Operations",
    image: "/images/team/team-member-31.jpg",
    experience: "5+ years",
    bio: "Selvi manages employee lifecycle processes, payroll coordination, compliance, benefits, corporate agreements, facilities, and workplace operations. Her coordination supports an efficient and welcoming studio environment.",
    skills: [
      "HR Operations",
      "Facility Management",
      "Payroll",
      "Compliance",
    ],
  },
  {
    id: 32,
    name: "Mutharasi P",
    role: "Accountant",
    department: "Finance",
    image: "/images/team/team-member-32.jpg",
    experience: "8+ years",
    bio: "Mutharasi manages payroll administration, client invoicing, budget tracking, expense controls, and financial documentation. Her methodical approach supports accurate reporting and audit readiness.",
    skills: [
      "Accounting",
      "Payroll",
      "Budget Tracking",
      "Financial Reporting",
    ],
  },
];

export default function Team() {
  const [activeIndex, setActiveIndex] =
    useState(null);

  const closeButtonRef = useRef(null);

  const selectedMember =
    activeIndex === null
      ? null
      : teamMembers[activeIndex];

  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
      }

      if (event.key === "ArrowLeft") {
        setActiveIndex((current) =>
          current === null
            ? null
            : (current - 1 + teamMembers.length) %
              teamMembers.length,
        );
      }

      if (event.key === "ArrowRight") {
        setActiveIndex((current) =>
          current === null
            ? null
            : (current + 1) %
              teamMembers.length,
        );
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown,
    );

    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 100);

    return () => {
      document.body.style.overflow =
        previousOverflow;

      document.removeEventListener(
        "keydown",
        handleKeyDown,
      );

      window.clearTimeout(focusTimer);
    };
  }, [activeIndex]);

  const openMember = (index) => {
    setActiveIndex(index);
  };

  const closeMember = () => {
    setActiveIndex(null);
  };

  const showPreviousMember = () => {
    setActiveIndex((current) =>
      current === null
        ? null
        : (current - 1 + teamMembers.length) %
          teamMembers.length,
    );
  };

  const showNextMember = () => {
    setActiveIndex((current) =>
      current === null
        ? null
        : (current + 1) %
          teamMembers.length,
    );
  };

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      closeMember();
    }
  };

  const handleModalPointerMove = (event) => {
    const modal = event.currentTarget;
    const bounds = modal.getBoundingClientRect();

    modal.style.setProperty(
      "--team-modal-x",
      `${event.clientX - bounds.left}px`,
    );

    modal.style.setProperty(
      "--team-modal-y",
      `${event.clientY - bounds.top}px`,
    );
  };

  return (
    <>
      <section
        className="team-page"
        aria-labelledby="team-page-title"
      >
        <div
          className="team-page-orb team-page-orb-one"
          aria-hidden="true"
        />

        <div
          className="team-page-orb team-page-orb-two"
          aria-hidden="true"
        />

        <div className="site-container">
          <motion.header
            className="team-page-header"
            initial={{
              opacity: 0,
              y: 55,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1,
              delay: 0.15,
              ease: revealEase,
            }}
          >
            <div className="team-page-label">
              <span className="team-page-label-line" />
              <span>Our team</span>
            </div>

            <div className="team-page-heading-layout">
              <h1
                id="team-page-title"
                className="team-page-title"
              >
                The people
                <span>behind the pixels.</span>
              </h1>

              <div className="team-page-introduction">
                <p>
                  Artists, technologists, and
                  production minds united by a
                  shared commitment to exceptional
                  visual storytelling.
                </p>

                <div className="team-page-count">
                  <strong>
                    {String(teamMembers.length).padStart(
                      2,
                      "0",
                    )}
                  </strong>

                  <span>Team members</span>
                </div>
              </div>
            </div>
          </motion.header>

          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <motion.article
                key={member.id}
                className="team-card"
                initial={{
                  opacity: 0,
                  y: 55,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.12,
                }}
                transition={{
                  duration: 0.75,
                  delay: Math.min(
                    (index % 4) * 0.07,
                    0.21,
                  ),
                  ease: revealEase,
                }}
              >
                <button
                  type="button"
                  className="team-card-button"
                  onClick={() => openMember(index)}
                  aria-label={`View profile of ${member.name}`}
                >
                  <div className="team-card-media">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="
                        (max-width: 640px) 50vw,
                        (max-width: 1024px) 33vw,
                        25vw
                      "
                      className="team-card-image"
                    />

                    <div
                      className="team-card-shade"
                      aria-hidden="true"
                    />

                    <span className="team-card-number">
                      {String(member.id).padStart(
                        2,
                        "0",
                      )}
                    </span>

                    <span
                      className="team-card-view"
                      aria-hidden="true"
                    >
                      <svg viewBox="0 0 24 24">
                        <path d="M5 19L19 5" />
                        <path d="M9 5H19V15" />
                      </svg>
                    </span>

                    <span className="team-card-department">
                      {member.department}
                    </span>
                  </div>

                  <div className="team-card-content">
                    <h2>{member.name}</h2>
                    <p>{member.role}</p>
                  </div>
                </button>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedMember && (
          <motion.div
            className="team-modal-backdrop"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.3,
            }}
            onMouseDown={handleBackdropClick}
          >
            <motion.div
              className="team-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="team-modal-name"
              aria-describedby="team-modal-bio"
              initial={{
                opacity: 0,
                y: 45,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 35,
                scale: 0.97,
              }}
              transition={{
                duration: 0.5,
                ease: revealEase,
              }}
              onPointerMove={
                handleModalPointerMove
              }
            >
              <div
                className="team-modal-glow"
                aria-hidden="true"
              />

              <button
                ref={closeButtonRef}
                type="button"
                className="team-modal-close"
                onClick={closeMember}
                aria-label="Close profile"
              >
                <span />
                <span />
              </button>

              <div className="team-modal-layout">
                <div className="team-modal-media">
                  <Image
                    key={selectedMember.image}
                    src={selectedMember.image}
                    alt={selectedMember.name}
                    fill
                    sizes="
                      (max-width: 768px) 100vw,
                      44vw
                    "
                    className="team-modal-image"
                    priority
                  />

                  <div
                    className="team-modal-image-shade"
                    aria-hidden="true"
                  />

                  <span className="team-modal-index">
                    {String(
                      selectedMember.id,
                    ).padStart(2, "0")}
                    <small>
                      /
                      {String(
                        teamMembers.length,
                      ).padStart(2, "0")}
                    </small>
                  </span>
                </div>

                <div className="team-modal-content">
                  <p className="team-modal-department">
                    {selectedMember.department}
                  </p>

                  <h2 id="team-modal-name">
                    {selectedMember.name}
                  </h2>

                  <p className="team-modal-role">
                    {selectedMember.role}
                  </p>

                  <div className="team-modal-rule" />

                  <p
                    id="team-modal-bio"
                    className="team-modal-bio"
                  >
                    {selectedMember.bio}
                  </p>

                  <div className="team-modal-meta">
                    <div>
                      <span>Experience</span>
                      <p>
                        {
                          selectedMember.experience
                        }
                      </p>
                    </div>

                    <div>
                      <span>Studio</span>
                      <p>ETRA Dreams</p>
                    </div>
                  </div>

                  <div className="team-modal-skills">
                    {selectedMember.skills.map(
                      (skill) => (
                        <span key={skill}>
                          {skill}
                        </span>
                      ),
                    )}
                  </div>
                </div>
              </div>

              <div className="team-modal-navigation">
                <button
                  type="button"
                  onClick={showPreviousMember}
                  aria-label="View previous team member"
                >
                  <span aria-hidden="true">←</span>
                  <span>Previous</span>
                </button>

                <button
                  type="button"
                  onClick={showNextMember}
                  aria-label="View next team member"
                >
                  <span>Next</span>
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}