import "./App.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "./components/ProfileTopNav/ProfileTopNav.css";
import NotFound from "./components/NotFound/NotFound.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loading from "./components/loading/loading.jsx";
import { AuthProvider } from "./Contexts/AuthContext.jsx";
import { ExhibitionsProvider } from "./Contexts/ExhibitionsContext.jsx";
import { PaintingsProvider } from "./Contexts/PaintingsContext.jsx";
import RefreshLayout from "./Layouts/RefreshLayout.jsx";
import { AnnouncementsProvider } from "./Contexts/AnncouncementsContext.jsx";
import Logout from "./Layouts/Logout.jsx";
import LoginRequired from "./Layouts/LoginRequired.jsx";
import AdminRequired from "./Layouts/AdminRequired.jsx";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary.jsx";
import ErrorComponent from "./components/ErrorComponent/ErrorComponent.jsx";
import { ToastProvider } from "./Contexts/ToastContext.jsx";
import Toaster from "./components/Toaster/Toaster.jsx";
import { APIProvider } from "./Contexts/APIContext.jsx";

function App() {
  const Home = lazy(() => import("./components/Home/Home.jsx"));
  const Dashboard = lazy(() => import("./components/Dashboard/Dashboard.jsx"));
  const ExhibitionsView = lazy(() =>
    import("./components/ExhibitionsView/ExhibitionsView.jsx")
  );
  const ListView = lazy(() => import("./components/ListView/ListView.jsx"));
  const ExhibitionCreationForm = lazy(() =>
    import(
      "./components/Forms/ExhibitionCreationForm/ExhibitionCreationForm.jsx"
    )
  );
  const ExhibitionsPaintingsView = lazy(() =>
    import("./components/ExhibitionsPaintingsView/ExhibitionsPaintingsView.jsx")
  );
  const ExhibitionImagesForm = lazy(() =>
    import("./components/Forms/ExhibitionImagesForm/ExhibitionImagesForm.jsx")
  );
  const PainterView = lazy(() =>
    import("./components/PainterView/PainterView.jsx")
  );
  const PainterCreationForm = lazy(() =>
    import("./components/Forms/PainterCreationForm/PainterCreationForm.jsx")
  );
  const BlogsView = lazy(() => import("./components/BlogsView/BlogsView.jsx"));
  const BlogCreationForm = lazy(() =>
    import("./components/Forms/BlogCreationForm/BlogCreationForm.jsx")
  );
  const PaintingsView = lazy(() =>
    import("./components/PaintingsView/PaintingsView.jsx")
  );
  const PaintingCreationForm = lazy(() =>
    import("./components/Forms/PaintingCreationForm/PaintingCreationForm.jsx")
  );
  const CustomersView = lazy(() =>
    import("./components/CustomersView/CustomersView.jsx")
  );
  const UserProfilePage = lazy(() =>
    import("./components/UserProfilePage/UserProfilePage.jsx")
  );
  const ProfilePage = lazy(() =>
    import("./components/ProfilePage/ProfilePage.jsx")
  );
  const PasswordChangeForm = lazy(() =>
    import("./components/Forms/PasswordChangeForm/PasswordChangeForm.jsx")
  );
  const UserPaintingsView = lazy(() =>
    import("./components/PaintingsView/UserPaintingsView.jsx")
  );
  const EmailVerification = lazy(() =>
    import("./components/EmailVerification/EmailVerification.jsx")
  );
  const GalleryShow = lazy(() =>
    import("./components/GalleryShow/GalleryShow.jsx")
  );
  const ProfileOutside = lazy(() =>
    import("./components/Profile/ProfileOutside.jsx")
  );
  const LoginForm = lazy(() =>
    import("./components/Forms/LogInForm/LoginForm.jsx")
  );
  const CheckPaymentForm = lazy(() =>
    import("./components/Forms/CheckPaymentForm/CheckPaymentForm.jsx")
  );
  const ExhibitionPaintingShow = lazy(() =>
    import("./components/ExhibitionPaintingShow/ExhibitionPaintingShow.jsx")
  );
  const ExhibitionPaintings = lazy(() =>
    import("./components/ExhibitionPaintings/ExhibitionPaintings.jsx")
  );
  const ExhibitionShowPage = lazy(() =>
    import("./components/ExhibitionShowPage/ExhibitionShowPage.jsx")
  );
  const PayementRegistrationForm = lazy(() =>
    import(
      "./components/Forms/PaymentRegistrationForm/PayementRegistrationForm.jsx"
    )
  );
  const Profile = lazy(() => import("./components/Profile/Profile.jsx"));

  return (
    <BrowserRouter>
      <ToastProvider>
        <Toaster />
        <ExhibitionsProvider>
          <PaintingsProvider>
            <AnnouncementsProvider>
              <AuthProvider>
                <APIProvider>
                  <Routes>
                    <Route element={<RefreshLayout />}>
                      <Route
                        path="/"
                        element={
                          <ErrorBoundary fallback={<ErrorComponent />}>
                            <Suspense fallback={<Loading />}>
                              <Home />
                            </Suspense>
                          </ErrorBoundary>
                        }
                      />
                      <Route
                        path="/exhibition/:id"
                        element={
                          <ErrorBoundary fallback={<ErrorComponent />}>
                            <Suspense fallback={<Loading />}>
                              <ExhibitionShowPage />
                            </Suspense>
                          </ErrorBoundary>
                        }
                      />
                      <Route
                        path="/view_painting/:id"
                        element={
                          <ErrorBoundary fallback={<ErrorComponent />}>
                            <Suspense fallback={<Loading />}>
                              <ExhibitionPaintingShow />
                            </Suspense>
                          </ErrorBoundary>
                        }
                      />
                      <Route
                        path="/oprofile"
                        element={
                          <ErrorBoundary fallback={<ErrorComponent />}>
                            <Suspense fallback={<Loading />}>
                              <ProfileOutside />
                            </Suspense>
                          </ErrorBoundary>
                        }
                      />
                      <Route
                        path="/check_payment/:id"
                        element={
                          <ErrorBoundary fallback={<ErrorComponent />}>
                            <Suspense fallback={<Loading />}>
                              <CheckPaymentForm />
                            </Suspense>
                          </ErrorBoundary>
                        }
                      />
                      <Route
                        path="/payment/:id"
                        element={
                          <ErrorBoundary fallback={<ErrorComponent />}>
                            <Suspense fallback={<Loading />}>
                              <PayementRegistrationForm />
                            </Suspense>
                          </ErrorBoundary>
                        }
                      />
                      <Route
                        path="/gallery/:name"
                        element={
                          <ErrorBoundary fallback={<ErrorComponent />}>
                            <Suspense fallback={<Loading />}>
                              <GalleryShow />
                            </Suspense>
                          </ErrorBoundary>
                        }
                      />
                      <Route
                        path="/verify-email"
                        element={
                          <ErrorBoundary fallback={<ErrorComponent />}>
                            <Suspense fallback={<Loading />}>
                              <EmailVerification />
                            </Suspense>
                          </ErrorBoundary>
                        }
                      />
                      <Route
                        path="/exhibition_paintings/:id"
                        element={
                          <ErrorBoundary fallback={<ErrorComponent />}>
                            <Suspense fallback={<Loading />}>
                              <ExhibitionPaintings />
                            </Suspense>
                          </ErrorBoundary>
                        }
                      />

                      <Route
                        path="/sign-in"
                        element={
                          <ErrorBoundary fallback={<ErrorComponent />}>
                            <Suspense fallback={<Loading />}>
                              <LoginForm />
                            </Suspense>
                          </ErrorBoundary>
                        }
                      />
                      <Route path="/:image" />
                      <Route element={<LoginRequired />}>
                        <Route element={<AdminRequired />}>
                          <Route
                            path="/profile"
                            element={
                              <ErrorBoundary fallback={<ErrorComponent />}>
                                <Suspense fallback={<Loading />}>
                                  <Profile />
                                </Suspense>
                              </ErrorBoundary>
                            }
                          >
                            <Route
                              index
                              element={
                                <ErrorBoundary fallback={<ErrorComponent />}>
                                  <Suspense fallback={<Loading />}>
                                    <Dashboard />
                                  </Suspense>
                                </ErrorBoundary>
                              }
                            />
                            <Route
                              path="dash"
                              element={
                                <ErrorBoundary fallback={<ErrorComponent />}>
                                  <Suspense fallback={<Loading />}>
                                    <Dashboard />
                                  </Suspense>
                                </ErrorBoundary>
                              }
                            />
                            <Route
                              path="exhibitions"
                              element={
                                <ErrorBoundary fallback={<ErrorComponent />}>
                                  <Suspense fallback={<Loading />}>
                                    <ExhibitionsView />
                                  </Suspense>
                                </ErrorBoundary>
                              }
                            >
                              <Route
                                index
                                element={
                                  <ErrorBoundary fallback={<ErrorComponent />}>
                                    <Suspense fallback={<Loading />}>
                                      <ListView title="List of Exhibtions" />
                                    </Suspense>
                                  </ErrorBoundary>
                                }
                              />
                              <Route
                                path="all"
                                element={
                                  <ErrorBoundary fallback={<ErrorComponent />}>
                                    <Suspense fallback={<Loading />}>
                                      <ListView title="List of Exhibtions" />
                                    </Suspense>
                                  </ErrorBoundary>
                                }
                              />
                              <Route
                                path="add_exhibition"
                                element={
                                  <ErrorBoundary fallback={<ErrorComponent />}>
                                    <Suspense fallback={<Loading />}>
                                      <ExhibitionCreationForm />
                                    </Suspense>
                                  </ErrorBoundary>
                                }
                              />
                            </Route>
                            <Route
                              path="exhibition_paintings"
                              element={
                                <ErrorBoundary fallback={<ErrorComponent />}>
                                  <Suspense fallback={<Loading />}>
                                    <ExhibitionsPaintingsView />
                                  </Suspense>
                                </ErrorBoundary>
                              }
                            >
                              <Route
                                index
                                element={
                                  <ErrorBoundary fallback={<ErrorComponent />}>
                                    <Suspense fallback={<Loading />}>
                                      <ListView title="List of Exhibtion Paintings" />
                                    </Suspense>
                                  </ErrorBoundary>
                                }
                              />
                              <Route
                                path="all"
                                element={
                                  <ErrorBoundary fallback={<ErrorComponent />}>
                                    <Suspense fallback={<Loading />}>
                                      <ListView title="List of Exhibtion Paintings" />
                                    </Suspense>
                                  </ErrorBoundary>
                                }
                              />
                              <Route
                                path="add_exhibition_paintings"
                                element={
                                  <ErrorBoundary fallback={<ErrorComponent />}>
                                    <Suspense fallback={<Loading />}>
                                      <ExhibitionImagesForm />
                                    </Suspense>
                                  </ErrorBoundary>
                                }
                              />
                            </Route>
                            <Route
                              path="painters"
                              element={
                                <ErrorBoundary fallback={<ErrorComponent />}>
                                  <Suspense fallback={<Loading />}>
                                    <PainterView />
                                  </Suspense>
                                </ErrorBoundary>
                              }
                            >
                              <Route
                                index
                                element={
                                  <ErrorBoundary fallback={<ErrorComponent />}>
                                    <Suspense fallback={<Loading />}>
                                      <ListView title="List of painters" />
                                    </Suspense>
                                  </ErrorBoundary>
                                }
                              />
                              <Route
                                path="all"
                                element={
                                  <ErrorBoundary fallback={<ErrorComponent />}>
                                    <Suspense fallback={<Loading />}>
                                      <ListView title="List of painters" />
                                    </Suspense>
                                  </ErrorBoundary>
                                }
                              />
                              <Route
                                path="add_painter"
                                element={
                                  <ErrorBoundary fallback={<ErrorComponent />}>
                                    <Suspense fallback={<Loading />}>
                                      <PainterCreationForm />
                                    </Suspense>
                                  </ErrorBoundary>
                                }
                              />
                            </Route>
                            <Route
                              path="blogs"
                              element={
                                <ErrorBoundary fallback={<ErrorComponent />}>
                                  <Suspense fallback={<Loading />}>
                                    <BlogsView />
                                  </Suspense>
                                </ErrorBoundary>
                              }
                            >
                              <Route
                                index
                                element={
                                  <ErrorBoundary fallback={<ErrorComponent />}>
                                    <Suspense fallback={<Loading />}>
                                      <ListView title="List of blogs" />
                                    </Suspense>
                                  </ErrorBoundary>
                                }
                              />
                              <Route
                                path="all"
                                element={
                                  <ErrorBoundary fallback={<ErrorComponent />}>
                                    <Suspense fallback={<Loading />}>
                                      <ListView title="List of blogs" />
                                    </Suspense>
                                  </ErrorBoundary>
                                }
                              />
                              <Route
                                path="add_blog"
                                element={
                                  <ErrorBoundary fallback={<ErrorComponent />}>
                                    <Suspense fallback={<Loading />}>
                                      <BlogCreationForm />
                                    </Suspense>
                                  </ErrorBoundary>
                                }
                              />
                            </Route>
                            <Route
                              path="paintings"
                              element={
                                <ErrorBoundary fallback={<ErrorComponent />}>
                                  <Suspense fallback={<Loading />}>
                                    <PaintingsView />
                                  </Suspense>
                                </ErrorBoundary>
                              }
                            >
                              <Route
                                index
                                element={
                                  <ErrorBoundary fallback={<ErrorComponent />}>
                                    <Suspense fallback={<Loading />}>
                                      <ListView title="List of paintings" />
                                    </Suspense>
                                  </ErrorBoundary>
                                }
                              />
                              <Route
                                path="all"
                                element={
                                  <ErrorBoundary fallback={<ErrorComponent />}>
                                    <Suspense fallback={<Loading />}>
                                      <ListView title="List of paintings" />
                                    </Suspense>
                                  </ErrorBoundary>
                                }
                              />
                              <Route
                                path="add_painting"
                                element={
                                  <ErrorBoundary fallback={<ErrorComponent />}>
                                    <Suspense fallback={<Loading />}>
                                      <PaintingCreationForm />
                                    </Suspense>
                                  </ErrorBoundary>
                                }
                              />
                            </Route>
                            <Route
                              path="customers"
                              element={
                                <ErrorBoundary fallback={<ErrorComponent />}>
                                  <Suspense fallback={<Loading />}>
                                    <CustomersView />
                                  </Suspense>
                                </ErrorBoundary>
                              }
                            >
                              <Route
                                index
                                element={
                                  <ErrorBoundary fallback={<ErrorComponent />}>
                                    <Suspense fallback={<Loading />}>
                                      <ListView title="List of customers" />
                                    </Suspense>
                                  </ErrorBoundary>
                                }
                              />
                              <Route
                                path="all"
                                element={
                                  <ErrorBoundary fallback={<ErrorComponent />}>
                                    <Suspense fallback={<Loading />}>
                                      <ListView title="List of customers" />
                                    </Suspense>
                                  </ErrorBoundary>
                                }
                              />
                            </Route>
                            <Route
                              path="change_password"
                              element={
                                <ErrorBoundary fallback={<ErrorComponent />}>
                                  <Suspense fallback={<Loading />}>
                                    <PasswordChangeForm />
                                  </Suspense>
                                </ErrorBoundary>
                              }
                            />
                          </Route>
                        </Route>
                        <Route
                          path="/user-profile"
                          element={
                            <ErrorBoundary fallback={<ErrorComponent />}>
                              <Suspense fallback={<Loading />}>
                                <UserProfilePage />
                              </Suspense>
                            </ErrorBoundary>
                          }
                        >
                          <Route
                            index
                            element={
                              <ErrorBoundary fallback={<ErrorComponent />}>
                                <Suspense fallback={<Loading />}>
                                  <ProfilePage />
                                </Suspense>
                              </ErrorBoundary>
                            }
                          />
                          <Route
                            path="profile"
                            element={
                              <ErrorBoundary fallback={<ErrorComponent />}>
                                <Suspense fallback={<Loading />}>
                                  <ProfilePage />
                                </Suspense>
                              </ErrorBoundary>
                            }
                          />
                          <Route
                            path="blogs"
                            element={
                              <ErrorBoundary fallback={<ErrorComponent />}>
                                <Suspense fallback={<Loading />}>
                                  <BlogsView />
                                </Suspense>
                              </ErrorBoundary>
                            }
                          >
                            <Route
                              index
                              element={
                                <ErrorBoundary fallback={<ErrorComponent />}>
                                  <Suspense fallback={<Loading />}>
                                    <ListView title="List of blogs" />
                                  </Suspense>
                                </ErrorBoundary>
                              }
                            />
                            <Route
                              path="all"
                              element={
                                <ErrorBoundary fallback={<ErrorComponent />}>
                                  <Suspense fallback={<Loading />}>
                                    <ListView title="List of blogs" />
                                  </Suspense>
                                </ErrorBoundary>
                              }
                            />
                          </Route>
                          <Route
                            path="paintings"
                            element={
                              <ErrorBoundary fallback={<ErrorComponent />}>
                                <Suspense fallback={<Loading />}>
                                  <UserPaintingsView />
                                </Suspense>
                              </ErrorBoundary>
                            }
                          >
                            <Route
                              index
                              element={
                                <ErrorBoundary fallback={<ErrorComponent />}>
                                  <Suspense fallback={<Loading />}>
                                    <ListView title="List of paintings" />
                                  </Suspense>
                                </ErrorBoundary>
                              }
                            />
                            <Route
                              path="all"
                              element={
                                <ErrorBoundary fallback={<ErrorComponent />}>
                                  <Suspense fallback={<Loading />}>
                                    <ListView title="List of paintings" />
                                  </Suspense>
                                </ErrorBoundary>
                              }
                            />
                            <Route
                              path="add_painting"
                              element={
                                <ErrorBoundary fallback={<ErrorComponent />}>
                                  <Suspense fallback={<Loading />}>
                                    <PaintingCreationForm />
                                  </Suspense>
                                </ErrorBoundary>
                              }
                            />
                          </Route>
                          <Route
                            path="change_password"
                            element={
                              <ErrorBoundary fallback={<ErrorComponent />}>
                                <Suspense fallback={<Loading />}>
                                  <PasswordChangeForm />
                                </Suspense>
                              </ErrorBoundary>
                            }
                          />
                        </Route>
                      </Route>
                      <Route
                        path="/logout"
                        element={
                          <ErrorBoundary fallback={<ErrorComponent />}>
                            <Suspense fallback={<Loading />}>
                              <Logout />
                            </Suspense>
                          </ErrorBoundary>
                        }
                      />
                      <Route path="/checkout/:payement-data" />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </APIProvider>
              </AuthProvider>
            </AnnouncementsProvider>
          </PaintingsProvider>
        </ExhibitionsProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
